"use client"

import React, { useState } from "react";
import Modal from "@/components/shared/Modal";
import { useToggleState } from "@/store/toggle";
import Select from "./shared/Select";
import { BsBookmarkFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function CreateNote() {
  const [disable, setDisable] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: ""
  });
  const {setModal, setFetchNotes} = useToggleState();

  const changeFormData = (value: string, state: string) => {
    setFormData((prevState) => ({...prevState, [state]: value}));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisable(true);

    const res = await fetch("/api/note", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setFormData({title: "", description: "", visibility: ""});
      setModal(false);
      setFetchNotes(true);
      toast.success("Berhasil menambahkan catatan");
    } else {
      const data = await res.json();
      toast.error(data.message);
    }

    setDisable(false);
  }

  return (
    <React.Fragment>
      <button
        onClick={() => setModal(true)}
        className="bg-orange-700 py-3 shadow-xl px-5 rounded-lg flex items-center gap-2 font-bold text-yellow-200 cursor-pointer"
      >
        <BsBookmarkFill />
        Buat Catatan
      </button>
      <Modal title="Buat Catatan">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-yellow-100">Judul Catatan</label>
            <input
              type="text"
              autoComplete="off"
              className="outline-none border-2 border-yellow-100 rounded-lg py-2 px-3 text-white"
              value={formData.title}
              onChange={(e) => changeFormData(e.target.value, "title")}
            />
          </div>
          <div className="h-4" />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-yellow-100">Catatan</label>
            <textarea
              rows={4}
              autoComplete="off"
              required
              className="outline-none border-2 border-yellow-100 rounded-lg py-2 px-3 text-white"
              value={formData.description}
              onChange={(e) => changeFormData(e.target.value, "description")}
            />
          </div>
          <div className="h-4" />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-yellow-100">Visibilitas</label>
            <Select
              options={[
                {value: "private", label: "Pribadi"},
                {value: "hidden", label: "Tidak Publik"},
                {value: "public", label: "Publik"}
              ]}
              onChange={(data) => changeFormData(data.value.toString(), "visibility")}
            />
          </div>
          <div className="h-6" />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setModal(false)}
              className="px-4 py-2 rounded-lg border border-transparent text-yellow-300 font-bold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-yellow-300 text-orange-700 font-bold cursor-pointer disabled:cursor-default flex items-center gap-2"
              disabled={disable}
            >
              {disable &&
                <div className="w-4 h-4 border-2 border-orange-700 border-t-transparent border-solid rounded-full animate-spin"></div>
              }
              Simpan
            </button>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
}