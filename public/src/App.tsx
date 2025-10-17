import { useEffect, useState } from "react";
import PWABadge from "./PWABadge.tsx";

export default function App() {
  const [QUESTIONS, setQUESTIONS] = useState([] as any);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);

  const q = QUESTIONS[index];

  function handleAnswer(value: any) {
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
  }

  function next() {
    setIndex((i) => Math.min(i + 1, QUESTIONS.length - 1));
  }
  function prev() {
    setIndex((i) => Math.max(i - 1, 0));
  }

  function submit() {
    setShowResults(true);
    setShowExplanations(true);
  }

  function score() {
    let s = 0;
    for (const item of QUESTIONS) {
      // @ts-expect-error "Expect-Error"
      const got = (answers[item.id] ?? "").toString().trim();
      const correct = item.a.toString().trim();
      if (got.length === 0) continue;
      if (got.toLowerCase() === correct.toLowerCase()) s++;
    }
    return s;
  }

  useEffect(() => {
    import(`./data/js_array.json`)
      .then((module) => {
        setQUESTIONS(module.default.questions)
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setQUESTIONS([]);
      });
  }, []);

  return (
    <>
      {QUESTIONS && QUESTIONS.length > 0 && (
        <div className="p-2 max-w-4xl mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              JS Arrays - 100 Questions Mock Test
            </h1>
            <div className="text-sm">
              Question {index + 1} / {QUESTIONS.length}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="mb-4">
              <div className="font-medium mb-2">
                {q.id}. {q.q}
              </div>

              {q.type === "mcq" && (
                <div className="space-y-2">
                  {
                    // @ts-expect-error "Expect-Error"
                    q.choices.map((c, i) => (
                      <label key={i} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={
                            // @ts-expect-error "Expect-Error"
                            (answers[q.id] ?? "") === c
                          }
                          onChange={() => handleAnswer(c)}
                        />
                        <span>{c}</span>
                      </label>
                    ))
                  }
                </div>
              )}

              {q.type === "tf" && (
                <div className="flex gap-4">
                  {["True", "False"].map((v) => (
                    <button
                      key={v}
                      onClick={() => handleAnswer(v)}
                      className={`px-3 py-1 rounded ${
                        // @ts-expect-error "Expect-Error"
                        answers[q.id] === v ? "bg-slate-200" : "bg-slate-50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}

              {q.type === "text" && (
                <div>
                  <input
                    value={
                      // @ts-expect-error "Expect-Error"
                      answers[q.id] ?? ""
                    }
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder="Type your answer exactly (case-insensitive)"
                    className="w-full border rounded p-2 mt-2"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="px-3 py-2 bg-slate-200 rounded"
                >
                  Prev
                </button>
                <button
                  onClick={next}
                  className="px-3 py-2 bg-slate-200 rounded"
                >
                  Next
                </button>
                <button
                  onClick={() => {
                    setIndex(0);
                    setAnswers({});
                    setShowResults(false);
                    setShowExplanations(false);
                  }}
                  className="px-3 py-2 bg-red-100 rounded"
                >
                  Reset
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm">
                  Answered: {Object.keys(answers).length}
                </div>
                <button
                  onClick={submit}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </div>

            {showResults && (
              <div className="mt-4 bg-green-50 p-4 rounded">
                <div className="font-semibold">
                  Score: {score()} / {QUESTIONS.length}
                </div>
                <div className="text-sm mt-1">
                  {Math.round((score() / QUESTIONS.length) * 100)}% correct
                </div>
              </div>
            )}

            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showExplanations}
                  onChange={(e) => setShowExplanations(e.target.checked)}
                />
                <span className="text-sm">Show Explanations</span>
              </label>
            </div>

            {showExplanations && (
              <div className="mt-4 space-y-3">
                <div className="font-semibold">Explanation</div>
                <div className="p-4 bg-slate-50 rounded">
                  <div className="text-sm">
                    <strong>Correct answer:</strong> {q.a.toString()}
                  </div>
                  <div className="text-sm mt-2">
                    <strong>Why:</strong> {q.explain}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <div className="font-semibold mb-2">Quick Navigation</div>
              <div className="grid grid-cols-10 gap-1">
                {QUESTIONS.map((it, i) => (
                  <button
                    key={it.id}
                    onClick={() => setIndex(i)}
                    className={`text-xs p-1 rounded ${
                      // @ts-expect-error "Expect-Error"
                      answers[it.id] ? "bg-green-100" : "bg-slate-200"
                    }`}
                  >
                    {it.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <div className="font-semibold mb-2">Legend</div>
              <div className="text-sm space-y-1">
                <div>
                  <span className="font-semibold">MCQ</span> — Choose one from
                  options
                </div>
                <div>
                  <span className="font-semibold">TF</span> — True / False
                </div>
                <div>
                  <span className="font-semibold">Text</span> — Type expected
                  output or short answer
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-500">
            Tip: For text answers, match the expected output text
            (case-insensitive). For array displays include brackets and commas
            like [1,2,3] where appropriate.
          </div>
        </div>
      )}

      <PWABadge />
    </>
  );
}
