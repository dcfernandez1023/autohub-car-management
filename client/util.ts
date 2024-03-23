export const readFileInput = async (inputId: string): Promise<string> => {
  const fileInput = document.getElementById(inputId) as HTMLInputElement;
  if (fileInput && fileInput.files && fileInput.files[0]) {
    const fileArrayBuffer = await fileInput.files[0].arrayBuffer();
    return arrayBufferToBase64String(fileArrayBuffer);
  }
  return "";
};

export const arrayBufferToBase64String = (arrayBuffer: ArrayBuffer) => {
  return btoa(
    new Uint8Array(arrayBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      "",
    ),
  );
};
