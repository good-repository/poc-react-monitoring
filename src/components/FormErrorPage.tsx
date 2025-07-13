import { logger } from "react-monitoring";

function FormErrorPage() {
  function handleSubmit(e: React.FormEvent) {
    logger.error({
      message: 'Form submission error teste',
    })
    e.preventDefault();
    // This will throw an error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.undefinedFunction();
  }
  return (
    <div >
      <h2>Form Error Example</h2>
      <button onClick={handleSubmit}>Submit (throws error)</button>
    </div>
  );
}

export default FormErrorPage;