import React, { useState } from "react";
import { toast } from "react-toastify";

const SelfForm = ({ onSubmit, existingData }) => {
  const [formData, setFormData] = useState(
    existingData || { title: "", description: "", category: "", date: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl shadow-lg bg-[#2B463C] text-[#F4F1E9] max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-[#B1D182]">
        {existingData ? "Update Self Care Activity" : "Add New Self Care"}
      </h2>

      <label className="block mb-2 text-sm">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 rounded bg-[#688F48] text-[#F4F1E9] mb-4 placeholder-[#F4F1E9]/60"
      />

      <label className="block mb-2 text-sm">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 rounded bg-[#688F48] text-[#F4F1E9] mb-4 placeholder-[#F4F1E9]/60"
      />

      <label className="block mb-2 text-sm">Category</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 rounded bg-[#688F48] text-[#F4F1E9] mb-4 placeholder-[#F4F1E9]/60"
      />

      <label className="block mb-2 text-sm">Date</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 rounded bg-[#688F48] text-[#F4F1E9] mb-6"
      />

      <button
        type="submit"
        className="w-full py-2 bg-[#688F48] text-[#F4F1E9] font-semibold rounded hover:bg-[#52917a] transition-colors"
      >
        {existingData ? "Update Activity" : "Add Activity"}
      </button>
    </form>
  );
};

export default SelfForm;
