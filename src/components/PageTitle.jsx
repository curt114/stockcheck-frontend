// =======================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =======================================================

export default function PageTitle({
  marginBottom = 'mb-9',
  textColor = 'text-violet-700',
  children,
}) {
  return (
    <h2
      className={`font-semibold uppercase tracking-tight ${marginBottom} ${textColor}`}
    >
      {children}
    </h2>
  );
}
