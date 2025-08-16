export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving…"
) {
  if (isLoading) {
    btn.textContent = loadingText;
    btn.disabled = true;
  } else {
    btn.textContent = defaultText;
    btn.disabled = false;
  }
}

export function checkResponse(res) {
  if (res.ok) return res.json();
  return res
    .json()
    .catch(() => ({}))
    .then((err) => Promise.reject(err.message || `Error: ${res.status}`));
}

// Only this helper is needed for likes
export function addIsLiked(card, userId) {
  // If server already provides a boolean, trust it
  if (card && typeof card.isLiked === "boolean") return card;

  // Otherwise compute from likes array (supports ids or objects)
  const likes = Array.isArray(card && card.likes) ? card.likes : [];
  const isLiked = likes.some((entry) => {
    if (typeof entry === "string") return entry === userId;
    if (entry && typeof entry === "object") return entry._id === userId;
    return false;
  });

  return { ...card, isLiked };
}


// export function setButtonText(
//   btn,
//   isLoading,
//   defaultText = "Save",
//   loadingText = "Saving…"
// ) {
//   if (isLoading) {
//     btn.textContent = loadingText;
//     btn.disabled = true;
//   } else {
//     btn.textContent = defaultText;
//     btn.disabled = false;
//   }
// }


// export function checkResponse(res) {
//   if (res.ok) return res.json();
//   return res
//     .json()
//     .catch(() => ({}))
//     .then((err) => Promise.reject(err.message || `Error: ${res.status}`));
// }

// // export function addIsLiked(card, userId) {
// //   return {
// //     ...card,
// //     isLiked: likedNow(card, userId),
// //   };
// // }

// export function likedNow(card, userId) {
//   return Array.isArray(card.likes) && card.likes.some(u => u._id === userId);
// }

// // utils/helpers.js

// export function addIsLiked(card, userId) {
//   // If the server already gave us a boolean, trust it.
//   if (typeof card?.isLiked === "boolean") return card;

//   // Otherwise compute from likes (supports array of ids OR user objects)
//   const likes = Array.isArray(card?.likes) ? card.likes : [];
//   const isLiked = likes.some((entry) => {
//     if (typeof entry === "string") return entry === userId;
//     if (entry && typeof entry === "object") return entry._id === userId;
//     return false;
//   });

//   return { ...card, isLiked };
// }

