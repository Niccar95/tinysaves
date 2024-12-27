import React, { FormEvent } from "react";

interface IProgressFormProps {
  progress: string;
  setProgress: (value: string) => void;
  errors: { [key: string]: string };
  setErrors: (errors: { [key: string]: string }) => void;
  handleUpdateProgress: (e: FormEvent) => Promise<void>;
}

const ProgressForm = ({
  progress,
  setProgress,
  errors,
  setErrors,
  handleUpdateProgress,
}: IProgressFormProps) => {
  return (
    <form className="progressForm" onSubmit={handleUpdateProgress}>
      <div>
        <input
          id="progress"
          type="text"
          min="0"
          value={progress ?? ""}
          onChange={(e) => {
            setProgress(e.target.value);
            setErrors({ ...errors, progress: "" });
          }}
        />
        {errors.progress && (
          <div className="errorMessage">{errors.progress}</div>
        )}
      </div>
      <button type="submit" className="updateButton width">
        Update
      </button>
    </form>
  );
};

export default ProgressForm;
