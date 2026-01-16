"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useUserStore } from "../../../stores/user.store";

interface UploadResult {
  url: string;
  [key: string]: unknown;
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [subName, setSubName] = useState("");
  const [result, setResult] = useState<UploadResult | null>(null);
  const { users, fetchUsers, loading } = useUserStore();

  const handleSubmit = async () => {
    if (!file) return alert("Select file");

    const form = new FormData();
    form.append("file", file);
    form.append("subName", subName);

    try {
      const res = await axios.post(
        `${process.env.API_URL}api/upload/single`,
        form
      );

      setResult(res.data);
    } catch (err: unknown | null) {
      console.error(err);
      alert("Upload failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <div>
        {users.map((u) => (
          <div key={u.id}>{u.name}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Company"
        onChange={(e) => setSubName(e.target.value)}
        className="border p-2 mr-2"
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 ml-2 rounded"
      >
        Upload
      </button>

      {result && (
        <div className="mt-4">
          <pre>{JSON.stringify(result, null, 2)}</pre>
          <Image
            src={result.url}
            alt="Upload result"
            width={256}
            height={256}
            className="w-64 mt-2 rounded"
          />
        </div>
      )}
    </div>
  );
}
