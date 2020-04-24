import { EvokerData } from '../data/arcarum';

interface ShareInfo {
  evoker: EvokerData;
  days: number;
}

const loadImg = (url: string): Promise<HTMLImageElement> => {
  const img = new Image();
  const promise = new Promise<HTMLImageElement>((resolve) => {
    img.onload = () => resolve(img);
  });
  img.src = url;

  return promise;
};

export const generateShareImageFile = async (data: ShareInfo): Promise<File> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const [WIDTH, HEIGHT] = [1920, 1080];
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  if (!ctx) {
    return Promise.reject();
  }

  ctx.fillStyle = 'rgb(52, 52, 53)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const logo = await loadImg('./img/share_image_logo.png');
  ctx.drawImage(logo, 0, 0);

  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';

  ctx.font = '72px system-ui';
  ctx.fillText(`${data.evoker.name.ja}取得まであと…`, WIDTH / 2, 500);

  ctx.font = 'bold 128px system-ui';
  ctx.fillText(`約${data.days}日！`, WIDTH / 2, 680);

  ctx.textAlign = 'right';
  ctx.font = '28px system-ui';
  ctx.fillText(`@kfurumiya`, WIDTH - 28, HEIGHT - 85);
  ctx.fillText(`https://sbfl.net/app/granbluefantasy/arcarumcalc/`, WIDTH - 28, HEIGHT - 45);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      blob ? resolve(new File([blob], 'evoker.png', { type: 'image/png' })) : reject();
    });
  });
};
