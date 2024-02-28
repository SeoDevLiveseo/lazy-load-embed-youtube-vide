const iframesYout = document.querySelectorAll(".box-descricao iframe");
iframesYout.forEach(index => {
  const src = index.getAttribute('src');
  index.removeAttribute('src');
  index.setAttribute('data-src',src);
})

let hasInitializedVideos = false;

function initVideo(iframe) {
  const dataSrc = iframe.getAttribute("data-src");
  if (dataSrc) {
    iframe.src = dataSrc;
  }
}

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (!hasInitializedVideos && entry.isIntersecting) {
      const iframe = entry.target;
      initVideo(iframe);
      observer.unobserve(iframe);
      hasInitializedVideos = true;
    }
  });
}

const iframes = document.querySelectorAll(".box-descricao iframe[data-src]");

const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5 // Adjust the threshold as needed
});

iframes.forEach(iframe => {
  observer.observe(iframe);
});