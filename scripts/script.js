const input = document.getElementById('formmater-input');
const preview = document.querySelector('.preview__text');


input.addEventListener('input', updatePreview)
input.addEventListener('input', () => {
    const value = input.value;
    input.value = value
        .replace(/\n/g, '')
        .replace(/\r/g, '')
        .replace(/\t/g, '');
});



function updatePreview() {
    const inputText = input.value;
    console.log(`Format text: ${inputText}`)
    const formated = formatText(inputText);
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