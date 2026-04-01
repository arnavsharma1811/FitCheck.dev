export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  isLoading = true;
  // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
  loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
    lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    pdfjsLib = lib;
    isLoading = false;
    return lib;
  });

  return loadPromise;
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    console.log("Step 1: Loading PDF.js...");
    const lib = await loadPdfJs();

    const arrayBuffer = await file.arrayBuffer();
    console.log("Step 2: ArrayBuffer created", arrayBuffer.byteLength);

    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    console.log("Step 3: PDF loaded, pages:", pdf.numPages);

    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 4 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      return { imageUrl: "", file: null, error: "Failed to get canvas context" };
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    await page.render({ canvasContext: context, viewport }).promise;
    console.log("Step 4: Render complete");

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          console.log("Step 5: Blob created", blob);
          if (blob) {
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.png`, {
              type: "image/png",
            });
            resolve({ imageUrl: URL.createObjectURL(blob), file: imageFile });
          } else {
            console.log("Step 5 FAILED: blob is null");
            resolve({ imageUrl: "", file: null, error: "Failed to create image blob" });
          }
        },
        "image/png",
        1.0
      );
    });
  } catch (err) {
    console.error("PDF conversion FAILED:", err);
    return { imageUrl: "", file: null, error: `Failed to convert PDF: ${err}` };
  }
}