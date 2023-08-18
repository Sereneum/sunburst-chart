import domtoimage from 'dom-to-image';

export const jsonDownloader = data => {
    const fileName = "file";
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], {type: 'application/json'});
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.json';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}

export const svgDownloader = () => {
    const node = document.getElementById('node');

    domtoimage.toJpeg(node, { quality: 0.95 })
        .then(function (dataUrl) {
            let link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
        });
}