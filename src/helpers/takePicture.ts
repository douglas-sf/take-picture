export function takePhoto(video: HTMLVideoElement, type: string) {
  const { videoWidth: width, videoHeight: height } = video;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  context?.drawImage(video, 0, 0, width, height);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject();
      } else {
        resolve(blob);
      }
    }, type);
  });
}
