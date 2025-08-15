export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving…"
) {
  if (isLoading) {
    btn.textContent = loadingText;
    btn.disabled = true; // Optionally disable the button while loading
  } else {
    btn.textContent = defaultText;
    btn.disabled = false; // Re-enable the button when not loading
  }
}
