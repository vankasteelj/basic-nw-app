/*
 * drag & drop
 */
window.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
}, false);
window.addEventListener('dragstart', function (e) {
    e.preventDefault();
    e.stopPropagation();
}, false);
window.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    DragDrop.handleDrop(e);
}, false);

var DragDrop = {
    handleDrop: function (e) {
        console.log(e.dataTransfer.files);
    }
};