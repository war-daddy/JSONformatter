import React, { useState } from "react";

export default function JsonFormatter() {
  const [rawJson, setRawJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const handleFormatJson = () => {
    try {
      const parsedJson = JSON.parse(rawJson); // Parse raw JSON
      const prettyJson = JSON.stringify(parsedJson, null, 4); // Format JSON
      setFormattedJson(prettyJson);
      setError(""); // Clear errors
      setCopyStatus(""); // Clear copy status
    } catch (err) {
      setError("Invalid JSON. Please correct it and try again.");
      setFormattedJson(""); // Clear formatted JSON
      setCopyStatus(""); // Clear copy status
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopyStatus("Copied to clipboard!");
    } catch (err) {
      setCopyStatus("Failed to copy. Please try again.");
    }
  };

  return (
    <div>
      <textarea
        placeholder="Paste your JSON here..."
        value={rawJson}
        onChange={(e) => setRawJson(e.target.value)}
        rows={10}
        cols={50}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleFormatJson} style={{ marginBottom: "10px" }}>
        Format JSON
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {formattedJson && (
        <div>
          <pre
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              overflowX: "auto",
              textAlign: "start",
            }}
          >
            {formattedJson}
          </pre>
          <button onClick={handleCopyToClipboard} style={{ marginTop: "10px" }}>
            Copy to Clipboard
          </button>
          {copyStatus && (
            <p style={{ color: "green", marginTop: "5px" }}>{copyStatus}</p>
          )}
        </div>
      )}
    </div>
  );
}
