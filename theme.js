/* Nocturnal theme switch — light mode is a first-class citizen.
 *
 * Dark is the default (:root). Light mode is the [data-theme="light"]
 * inversion. This helper:
 *   - on first load, honors a saved choice, else the OS prefers-color-scheme
 *   - persists the user's explicit choice in localStorage
 *   - exposes window.Nocturnal.{get, set, toggle}
 *
 * To avoid a flash of the wrong theme, load this in <head> BEFORE your CSS,
 * or inline the apply() call. Vanilla JS, no dependencies, no build step.
 */
(function () {
  var KEY = "nocturnal-theme";
  var root = document.documentElement;

  function apply(theme) {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme"); // dark is the default :root
  }

  function preferred() {
    var saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function get() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  function set(theme) {
    localStorage.setItem(KEY, theme);
    apply(theme);
  }
  function toggle() {
    set(get() === "light" ? "dark" : "light");
  }

  apply(preferred());

  // Follow the OS until the user makes an explicit choice.
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", function (e) {
        if (!localStorage.getItem(KEY)) apply(e.matches ? "light" : "dark");
      });
  }

  window.Nocturnal = { get: get, set: set, toggle: toggle };
})();
