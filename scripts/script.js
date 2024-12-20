const input = document.getElementById('formmater-input');
const preview = document.querySelector('.preview__text');

openSite();

input.addEventListener('input', (e) => {updatePreview(e.target.value)})
input.addEventListener('input', () => {
    const value = input.value;
    input.value = value
        .replace(/\n/g, '')
        .replace(/\r/g, '')
        .replace(/\t/g, '');
});



function updatePreview(text) {
    console.log(`Format text: ${text}`)
    const formated = formatText(text);
    preview.innerHTML = formated;
}

function formatText(text) {
    let formated = text
        .replace(/<QD_THIN>/g, '<span class="preview__text--thin">')
        .replace(/<QD_NORMAL>/g, '<span class="preview__text--bold">')
        .replace(/<QD_BR>/g, '<br>')
        .replace(/<\/QD_THIN>|<\/QD_NORMAL>/g, '</span>');
    return formated;
}

function insertTextAtCursor(tag) {
    const cursorPosition = input.selectionStart;
    const textBefore = input.value.substring(0, cursorPosition);
    const textAfter = input.value.substring(cursorPosition);

    const resultText = textBefore + tag + textAfter;

    input.value = resultText;
    input.selectionStart = cursorPosition + tag.length;
    input.selectionEnd = cursorPosition + tag.length;

    input.focus();
    updatePreview();
}

function openSite() {
    let params = new URLSearchParams(document.location.search);
    let text = params.get('text');

    if (text) {
        console.log(`Has param: Text = ${text}`)
        input.value = text;
        updatePreview(text);
    } else {
        console.log(`No has param text in url`);
    }
}