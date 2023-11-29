// =========================================================
// NAME: CURTIS LEBENSORGER
// DATE: 11/21/2023
// =========================================================

// =========================================================
// BIOGRAPHY PARENT COMPONENT
// =========================================================
function Biography({ children }) {
  return (
    <div className="grid items-center md:gap-x-24 lg:grid-cols-2">
      {children}
    </div>
  );
}

// =========================================================
// BIOGRAPHY PICTURE CHILD COMPONENT
// =========================================================
function Picture({ image }) {
  return (
    <div className="justify-self-center">
      <div className="flex h-72 w-72 items-center justify-center border-4 border-violet-500">
        <div
          className="flex h-[275px] w-[275px] items-center justify-center"
          style={{
            background:
              'linear-gradient(45deg, #8b5cf6 10%, transparent 10%, transparent 50%, #8b5cf6 50%, #8b5cf6 60%, transparent 60%, transparent 100%)',
            backgroundSize: '15px 15px',
          }}
        >
          <div className="flex h-56 w-56 items-center justify-center bg-white">
            <div className="h-[220px] w-[220px] border-2 border-dashed border-violet-500">
              <img className="h-full w-full px-2 pt-2" src={image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// BIOGRAPHY BACKGROUND CHILD COMPONENT
// =========================================================
function Background({ children }) {
  return <div>{children}</div>;
}

// =========================================================
// BIOGRAPHY NAME CHILD COMPONENT
// =========================================================
function Name({ name }) {
  return (
    <h1 className="mb-1 mt-9 text-xl font-bold text-slate-900 min-[350px]:text-2xl lg:m-0">
      {name} In A{' '}
      <span className="rounded border-2 border-dashed border-violet-400 p-1">
        Box
      </span>
    </h1>
  );
}

// =========================================================
// BIOGRAPHY TITLE CHILD COMPONENT
// =========================================================
function Title({ children }) {
  return (
    <h2 className="mb-3 text-xl font-semibold text-violet-500">{children}</h2>
  );
}

// =========================================================
// BIOGRAPHY DESCRIPTION CHILD COMPONENT
// =========================================================
function Description({ children }) {
  return <p className="text-slate-600 md:max-w-prose">{children}</p>;
}

// =========================================================
// BIOGRAPHY LINKS CHILD COMPONENT
// =========================================================
function Links() {
  return (
    <div className="mt-3 flex justify-end gap-2 md:max-w-prose">
      <a
        href="#"
        className="rounded px-4 py-2 text-slate-600 ring-2 ring-violet-400 transition-colors duration-300 hover:bg-violet-400 hover:text-violet-50"
      >
        LinkedIn
      </a>
      <a
        href="#"
        className="rounded bg-violet-400 px-4 py-2 text-violet-50 ring-2 ring-violet-400 transition-colors duration-300 hover:bg-transparent hover:text-slate-600"
      >
        GitHub
      </a>
    </div>
  );
}

// =========================================================
// CHILD COMPONENTS AS PROPERTIES TO PARENT COMPONENTS
// =========================================================
Biography.Picture = Picture;
Biography.Background = Background;
Biography.Name = Name;
Biography.Title = Title;
Biography.Description = Description;
Biography.Links = Links;

export default Biography;
