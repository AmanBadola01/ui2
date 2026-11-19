"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "./Icons";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  avatar: string;
}

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Jason Price",
    position: "Admin",
    email: "janick_parisian@yahoo.com",
    avatar: "/team1.png",
  },
  {
    id: "2",
    name: "Jukkoe Sisao",
    position: "CEO",
    email: "sibyl_kozey@gmail.com",
    avatar: "/team2.png",
  },
  {
    id: "3",
    name: "Harriet King",
    position: "CTO",
    email: "nadia_block@hotmail.com",
    avatar: "/team3.png",
  },
  {
    id: "4",
    name: "Lenora Benson",
    position: "Lead",
    email: "feil.wallace@kunde.us",
    avatar: "/team4.png",
  },
  {
    id: "5",
    name: "Olivia Reese",
    position: "Strategist",
    email: "kemmer.hattie@cremin.us",
    avatar: "/team5.png",
  },
  {
    id: "6",
    name: "Bertha Valdez",
    position: "CEO",
    email: "loraine.koelpin@tromp.io",
    avatar: "/team6.png",
  },
  {
    id: "7",
    name: "Harriett Payne",
    position: "Digital Marketer",
    email: "nannie_west@estrella.tv",
    avatar: "/team7.png",
  },
  {
    id: "8",
    name: "George Bryant",
    position: "Social Media",
    email: "delmer.kling@gmail.com",
    avatar: "/team8.png",
  },
  {
    id: "9",
    name: "Lily French",
    position: "Strategist",
    email: "lucienne.herman@hotmail.com",
    avatar: "/team9.png",
  },
  {
    id: "10",
    name: "Howard Adkins",
    position: "CEO",
    email: "wiegand.leonor@herman.us",
    avatar: "/team10.png",
  },
  {
    id: "11",
    name: "Earl Bowman",
    position: "Digital Marketer",
    email: "waino_altenwerth@nicolette.tv",
    avatar: "/team11.png",
  },
  {
    id: "12",
    name: "Patrick Padilla",
    position: "Social Media",
    email: "octavia.nienow@gleichner.net",
    avatar: "/team12.png",
  },
];

function CardTopography() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-[0.28]"
      viewBox="0 0 240 260"
      fill="none"
      stroke="#CBD5E1"
      strokeWidth="1"
      aria-hidden="true"
    >
      {/* Top-right concentric loops */}
      <path d="M190,20 C220,15 245,40 240,70 C235,100 200,105 170,90 C140,75 135,40 155,25 C170,15 180,20 190,20 Z" />
      <path d="M205,5 C240,-5 270,35 260,80 C250,125 190,130 155,110 C120,90 115,40 145,10 C165,-10 190,5 205,5 Z" />
      <path d="M220,-10 C265,-25 300,30 280,95 C260,160 175,155 135,130 C95,105 90,30 130,-5 C160,-35 200,-10 220,-10 Z" />

      {/* Gentle contour waves */}
      <path d="M-20,70 C40,40 90,110 160,80 C210,55 240,90 270,70" />
      <path d="M-10,130 C50,100 90,160 150,130 C210,100 240,150 280,120" />
      <path d="M-20,190 C40,160 90,220 160,185 C220,155 245,210 275,175" />

      {/* Bottom-left concentric loops */}
      <path d="M50,210 C75,195 105,210 110,230 C115,250 95,270 65,270 C35,270 20,245 30,225 C40,210 45,210 50,210 Z" />
      <path d="M60,190 C95,170 135,195 140,230 C145,265 115,295 75,295 C30,295 10,250 20,215 C30,190 50,190 60,190 Z" />
      <path d="M70,170 C115,145 160,180 165,230 C170,280 130,320 80,320 C20,320 -5,260 5,205 C15,165 45,170 70,170 Z" />
    </svg>
  );
}

export default function TeamView() {
  const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [isAddingMember, setIsAddingMember] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("CEO");
  const [gender, setGender] = useState("Male");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName} ${lastName}`.trim() || "New Member";
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: fullName,
      position: position || "CEO",
      email: email || "member@dashstack.com",
      avatar: photoPreview || "/team1.png",
    };
    setMembers([newMember, ...members]);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPosition("CEO");
      setGender("Male");
      setPhotoPreview(null);
      setIsAddingMember(false);
    }, 800);
  };

  if (isAddingMember) {
    return (
      <div className="space-y-7">
        {/* Page Title with Back Button */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsAddingMember(false)}
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#4880FF] hover:border-[#4880FF] transition-all cursor-pointer shadow-2xs"
            title="Back to Team"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
            Add Team Member
          </h1>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-2xs px-8 sm:px-14 py-12 max-w-[980px] w-full mx-auto">
          <form onSubmit={handleSubmit}>
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
                className="w-20 h-20 rounded-full bg-[#ECEEF2] flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity relative group cursor-pointer"
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
                  <svg
                    className="w-7 h-7 text-[#202224]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-10">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                    Your email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                    Position
                  </label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="CEO"
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] placeholder-gray-400 focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all font-['Nunito_Sans',sans-serif]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#606266] mb-2 block font-['Nunito_Sans',sans-serif]">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-transparent bg-[#F5F6FA] text-sm text-[#202224] focus:outline-none focus:border-[#4880FF] focus:bg-white transition-all appearance-none cursor-pointer font-['Nunito_Sans',sans-serif]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <ChevronDownIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="mt-10 flex flex-col items-center">
              <button
                type="submit"
                className="w-48 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-sm rounded-lg shadow-sm shadow-[#4880FF]/25 transition-all active:scale-98 cursor-pointer"
              >
                Add Now
              </button>
              {isSubmitted && (
                <span className="text-xs font-semibold text-emerald-600 mt-3 animate-in fade-in">
                  Team member added successfully!
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* Page Title & Add New Member Action */}
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] font-bold text-[#202224] leading-none tracking-[-0.11px] font-['Nunito_Sans',sans-serif]">
          Team
        </h1>
        <button
          type="button"
          onClick={() => setIsAddingMember(true)}
          className="px-6 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-sm rounded-lg shadow-sm shadow-[#4880FF]/25 transition-all active:scale-98 cursor-pointer"
        >
          Add New Member
        </button>
      </div>

      {/* 4x3 Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="relative bg-white rounded-[24px] border border-gray-100 shadow-2xs p-6 flex flex-col items-center text-center overflow-hidden transition-all duration-200 hover:shadow-md group"
          >
            {/* Subtle Topographic Background */}
            <CardTopography />

            {/* Member Details */}
            <div className="relative z-10 flex flex-col items-center w-full">
              <div className="w-[84px] h-[84px] rounded-full overflow-hidden relative shadow-xs mb-3.5 bg-gray-100 border-2 border-white">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-base font-bold text-[#202224] font-['Nunito_Sans',sans-serif] leading-snug">
                {member.name}
              </h3>

              <p className="text-xs text-[#8A9099] font-medium font-['Nunito_Sans',sans-serif] mt-0.5">
                {member.position}
              </p>

              <p className="text-xs text-[#202224] font-medium font-['Nunito_Sans',sans-serif] mt-3.5 truncate max-w-full px-1">
                {member.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
