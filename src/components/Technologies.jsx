// =========================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =========================================================

// =========================================================
// TECHNOLOGIES PARENT COMPONENT
// =========================================================
function Technologies({ children }) {
  return <div>{children}</div>;
}

// =========================================================
// TECHNOLOGIES TITLE CHILD COMPONENT
// =========================================================
function Title({ children }) {
  return <h3 className="mt-12 border-b-2 py-2 text-slate-600">{children}</h3>;
}

// =========================================================
// TECHNOLOGIES SKILLS CHILD COMPONENT
// =========================================================
function Skills({ children }) {
  return (
    <div className="my-9 flex flex-wrap items-center justify-center gap-8">
      {children}
    </div>
  );
}

// =========================================================
// CHILD COMPONENTS AS PROPERTIES TO PARENT COMPONENTS
// =========================================================
Technologies.Title = Title;
Technologies.Skills = Skills;

export default Technologies;
