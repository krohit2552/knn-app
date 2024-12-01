const datasetDisplay = document.getElementById("dataset-display");
const datasetTableBody = document.getElementById("dataset-table-body");
const predictedClassDisplay = document.getElementById("predicted-class-display");

document.getElementById("generate-dataset-btn").addEventListener("click", async () => {
  const range = Number(document.getElementById("range-input").value);
  const size = Number(document.getElementById("size-input").value);

  try {
    const response = await fetch(`http://localhost:5000/generate-dataset?size=${size}&range=${range}`);
    const data = await response.json();

    // Clear previous data
    datasetTableBody.innerHTML = "";

    // Populate table with new data
    const labeledData = [
      ...data.classA.map((point) => ({ ...point, class: "A" })),
      ...data.classB.map((point) => ({ ...point, class: "B" })),
    ];

    labeledData.forEach((point) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${point.x}</td><td>${point.y}</td><td>${point.class}</td>`;
      datasetTableBody.appendChild(row);
    });

    datasetDisplay.style.display = "block";
  } catch (error) {
    console.error("Error fetching dataset:", error);
    alert("Failed to generate dataset.");
  }
});

document.getElementById("predict-btn").addEventListener("click", async () => {
  const k = Number(document.getElementById("k-input").value);
  const newPoint = {
    x: Number(document.getElementById("new-point-x").value),
    y: Number(document.getElementById("new-point-y").value),
  };

  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        classA: [], // Replace with the actual classA points
        classB: [], // Replace with the actual classB points
        k,
        newPoint,
      }),
    });

    const data = await response.json();
    predictedClassDisplay.textContent = `Predicted Class: ${data.predictedClass}`;
  } catch (error) {
    console.error("Prediction error:", error);
    alert("Prediction failed.");
  }
});
