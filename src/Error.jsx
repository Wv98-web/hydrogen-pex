export default function Error({ error }) {
  return (
    <div>
      <h1>An unknown error occured!</h1>
      <h2>{error.message}</h2>
      <h3>{error.stack}</h3>
    </div>
  );
}
