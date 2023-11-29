// =========================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =========================================================

// =========================================================
// OBJECTIVES PARENT COMPONENT
// =========================================================
function Objective({ children }) {
  return (
    <div className="grid gap-y-4 md:grid-cols-2 md:gap-x-24 md:gap-y-12">
      {children}
    </div>
  );
}

// =========================================================
// ICON OBJECTIVE CHILD COMPONENT
// =========================================================
function Icon({ icon, order }) {
  return (
    <div
      className={`w-full rounded border-2 border-dashed border-violet-600 py-5 text-center min-[425px]:justify-self-center ${order} -z-10 self-center`}
    >
      <span className="relative m-12 inline-flex items-center justify-center">
        <span
          className="absolute -z-20 block w-3/5 rounded-full bg-violet-600 p-[70%]
      "
        ></span>
        <span
          className="absolute -z-30 block w-3/5 rounded-full bg-violet-400 p-[100%]
      "
        ></span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-24 w-24 stroke-violet-50"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        </span>
      </span>
    </div>
  );
}

// =========================================================
// INFO OBJECTIVE CHILD COMPONENT
// =========================================================

function Info({ order, header, children }) {
  return (
    <div className={`self-center ${order}`}>
      <h2 className="mb-2 mt-4 text-2xl font-bold text-slate-900">{header}</h2>
      <div className="mb-5 text-slate-600 md:mb-0 md:max-w-prose">
        {children}
      </div>
    </div>
  );
}

// =========================================================
// CHILD COMPONENTS AS PROPERTIES TO PARENT COMPONENTS
// =========================================================
Objective.Icon = Icon;
Objective.Info = Info;

export default Objective;
