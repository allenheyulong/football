/*rem适配*/
(function () {
    const styleNode = document.createElement('style')
    const width = document.documentElement.clientWidth/16
    styleNode.innerHTML = 'html{font-size:' + width + 'px;}'
    document.head.appendChild(styleNode)
})();