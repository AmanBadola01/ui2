"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { MailIcon, ChevronDownIcon } from "./Icons";

interface Contact {
  id: number;
  name: string;
  email: string;
  image: string;
}

const initialContacts: Contact[] = [
  {
    id: 1,
    name: "Jason Price",
    email: "kuhlman.jermey@yahoo.com",
    image: "/person1.png",
  },
  {
    id: 2,
    name: "Duane Dean",
    email: "rusty.botsford@wilfrid.io",
    image: "/person2.png",
  },
  {
    id: 3,
    name: "Jonathan Barker",
    email: "cora_haley@quinn.biz",
    image: "/person3.png",
  },
  {
    id: 4,
    name: "Rosie Glover",
    email: "lockman.marques@hotmail.com",
    image: "/person4.png",
  },
  {
    id: 5,
    name: "Patrick Greer",
    email: "pearlie.eichmann@trevion.net",
    image: "/person5.png",
  },
  {
    id: 6,
    name: "Darrell Ortega",
    email: "chaya.shields@ferry.info",
    image: "/person6.png",
  },
];

export default function ContactView() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [isAddingContact, setIsAddingContact] = useState(false);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("Male");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || "New Contact";
    const newContact: Contact = {
      id: Date.now(),
      name: fullName,
      email: email.trim() || "contact@example.com",
      image: photoPreview || "/person1.png",
    };

    setContacts([newContact, ...contacts]);
    // Reset form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setBirthDate("");
    setGender("Male");
    setPhotoPreview(null);
    setIsAddingContact(false);
  };

  if (isAddingContact) {
    return (
      <div className="space-y-7">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddingContact(false)}
              className="p-2 -ml-2 rounded-lg text-gray-500 hover:text-[#4880FF] hover:bg-white transition-colors"
              title="Back to contacts"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
              Add New Contact
            </h1>
          </div>
        </div>

        {/* Add Contact Card Form */}
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-xs px-8 sm:px-14 py-12 max-w-[980px] w-full mx-auto">
          <form onSubmit={handleAddContact}>
            {/* Avatar Photo Upload */}
            <div className="flex flex-col items-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-full bg-[#E8EDF5] flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity relative group"
                title="Click to upload photo"
              >
                {photoPreview ? (
                  <Image
                    src={photoPreview}
                    alt="Uploaded photo"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <svg className="w-7 h-7 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-[#4880FF] hover:underline cursor-pointer mt-3"
              >
                Upload Photo
              </button>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-10 max-w-[840px] mx-auto">
              {/* First Name */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full bg-[#F5F6FA] border border-gray-200/80 rounded-lg px-4 py-3.5 text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-[#4880FF]/15 transition-all"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="w-full bg-[#F5F6FA] border border-gray-200/80 rounded-lg px-4 py-3.5 text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-[#4880FF]/15 transition-all"
                />
              </div>

              {/* Your Email */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#F5F6FA] border border-gray-200/80 rounded-lg px-4 py-3.5 text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-[#4880FF]/15 transition-all"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full bg-[#F5F6FA] border border-gray-200/80 rounded-lg px-4 py-3.5 text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-[#4880FF]/15 transition-all"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Date of Birth
                </label>
                <input
                  type="text"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="Enter your birthdate"
                  className="w-full bg-[#F5F6FA] border border-gray-200/80 rounded-lg px-4 py-3.5 text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-[#4880FF]/15 transition-all"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Gender
                </label>
                <div className="relative">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-[#F5F6FA] border border-gray-200/80 rounded-lg px-4 py-3.5 text-sm text-[#202224] appearance-none focus:outline-none focus:border-[#4880FF] focus:bg-white focus:ring-2 focus:ring-[#4880FF]/15 transition-all pr-10 cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="bg-[#4880FF] hover:bg-blue-600 text-white font-semibold text-sm px-16 py-3.5 rounded-xl shadow-md shadow-[#4880FF]/25 mx-auto block mt-10 active:scale-95 transition-all"
            >
              Add Now
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
          Contact
        </h1>
        <button
          type="button"
          onClick={() => setIsAddingContact(true)}
          className="bg-[#4880FF] hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-sm active:scale-95"
        >
          Add New Contact
        </button>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1240px] w-full">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden flex flex-col items-center text-center transition-all duration-200 hover:shadow-md"
          >
            {/* Contact Avatar Photo */}
            <div className="relative w-full h-50 overflow-hidden bg-gray-50">
              <Image
                src={contact.image}
                alt={contact.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={contact.id <= 3}
              />
            </div>

            {/* Contact Details */}
            <h3 className="text-base font-bold text-[#202224] mt-4 tracking-tight">
              {contact.name}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{contact.email}</p>

            {/* Message Action Button */}
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2 border border-gray-200 hover:border-[#4880FF] hover:text-[#4880FF] rounded-lg text-xs font-semibold text-gray-600 transition-colors mt-4 mb-5 active:scale-95"
            >
              <MailIcon className="w-3.5 h-3.5" />
              <span>Message</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
