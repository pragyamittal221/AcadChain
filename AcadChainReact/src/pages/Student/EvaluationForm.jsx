function EvaluationForm({ formData, handleRatingChange }) {
  const ratingsOptions = [
    "Poor",
    "Below Average",
    "Average",
    "Above Average",
    "Excellent",
  ];

  return (
    <div className="p-4 rounded-lg mt-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-6 text-center">Evaluation</h2>
      {Object.keys(formData).map((rowKey) => (
        <div key={rowKey} className="mb-4 p-2 ">
          <span className="font-semibold block mb-2">
            {formData[rowKey].text}
          </span>
          <div className="flex justify-between items-center space-x-6">
            {ratingsOptions.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={rowKey}
                  value={option}
                  checked={formData[rowKey].rating === option}
                  onChange={() => handleRatingChange(rowKey, option)}
                  className="focus:ring-2 focus:ring-zinc-800"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EvaluationForm;
