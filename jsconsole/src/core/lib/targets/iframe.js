/*global document */
export { contentWindow: window, contentDocument: document };

export default function run(command) {
  const res = {
    error: false,
    command,
  };

  try {
    res.value = eval(command);
    window.$_ = res.value;
  } catch (error) {
    res.error = true;
    res.value = error;
  }

  return res;
}
