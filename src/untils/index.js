import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
// 将html节点转换为图片
export const generateImg = async(SHARE_CARD_ID, SHARE_CARD_CANVAS) => {
    try {
      const html = document.querySelectorAll('wrap card-wrap');
      const card = document.getElementById(SHARE_CARD_ID);
      const scale = 3;
      const width = card && card.offsetWidth || undefined;
      const height = card && card.offsetHeight || undefined;
      const osTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (!html || !card) {
        throw new Error('所需HTML不存在');
      }
      const programConfig = {
        scale,
        useCORS: true,
        background: null,
        width,
        height,
        windowWidth: width,
        windowHeight: height,
        x: 0,
        y: osTop,
      };
    //   isCreatingImg(true);
      const canvas = await html2canvas(card, programConfig);
    //   isCreatingImg(false);
      canvas.id = SHARE_CARD_CANVAS;
      canvas.className = `${SHARE_CARD_CANVAS}`;
      const base64 = canvas.toDataURL('image/jpeg');
      return base64;
    } catch (error) {
      console.log(error);
      return '';
    }
  };
// 根据链接生成二维码
export const generateQRCode = async(shareLink) => {
    const link = shareLink;
    try {
      const code = await QRCode.toDataURL(link);
      return code;
    } catch (error) {
      console.log(error);
    }
};
export const isIOS = () => {
    return navigator.userAgent.match(/ipad|iphone/i);
}
// 复制到剪贴板
export const copy_text = (text, cb) => {
    console.log('复制成功')
    let range;
    let selection;
    const input = document.createElement('input');
    input.setAttribute('style', 'position:fixed;z-index:-1;');
    input.setAttribute('readonly', '')
    input.value = text;
    document.body.appendChild(input);
    if (isIOS()) {
      range = document.createRange();
      range.selectNodeContents(input);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      input.setSelectionRange(0, 999999);
    } else {
      input.select();
    }
    const successful = document.execCommand('copy');
    if (successful) {
      cb && cb(true)
    } else {
      cb && cb(false)
      console.log('该浏览器不支持自动复制，请自行复制!');
    }
    document.body.removeChild(input)
  }