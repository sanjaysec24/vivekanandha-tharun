import React from 'react';

// Shared definitions for our premium 3D vectors
export function IllustrationDefs() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
      <defs>
        {/* Crisp grid pattern for the school checked shirt uniform */}
        <pattern id="uniform-checks" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#FFFFFF" />
          <rect width="5" height="10" fill="#E74C3C" opacity="0.3" />
          <rect width="10" height="5" fill="#E74C3C" opacity="0.3" />
          {/* Subtle separator line */}
          <line x1="0" y1="0" x2="10" y2="0" stroke="#C0392B" strokeWidth="0.5" opacity="0.4" />
          <line x1="0" y1="0" x2="0" y2="10" stroke="#C0392B" strokeWidth="0.5" opacity="0.4" />
        </pattern>

        {/* 3D Skin Gradients for warm South Indian / Tamil skin tones */}
        <linearGradient id="skin-base-boy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C98B5F" />
          <stop offset="60%" stopColor="#AD6C41" />
          <stop offset="100%" stopColor="#8A4E27" />
        </linearGradient>

        <linearGradient id="skin-base-girl" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D49A6C" />
          <stop offset="60%" stopColor="#B57648" />
          <stop offset="100%" stopColor="#96582E" />
        </linearGradient>

        {/* Hair Gradients */}
        <linearGradient id="hair-main" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#333333" />
          <stop offset="100%" stopColor="#151515" />
        </linearGradient>

        {/* Red Shorts / Red Pinafore Gradients */}
        <linearGradient id="red-uniform-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E74C3C" />
          <stop offset="60%" stopColor="#C0392B" />
          <stop offset="100%" stopColor="#962D22" />
        </linearGradient>

        {/* Book Cover Gradients */}
        <linearGradient id="book-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5DADE2" />
          <stop offset="100%" stopColor="#2E86C1" />
        </linearGradient>
        <linearGradient id="book-orange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5B041" />
          <stop offset="100%" stopColor="#D35400" />
        </linearGradient>

        {/* Gold Emblem Gradient */}
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4D03F" />
          <stop offset="100%" stopColor="#D4AC0D" />
        </linearGradient>

        {/* Soft 3D Shadow for floor */}
        <radialGradient id="floor-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3A2318" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3A2318" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

interface IllustrationProps {
  className?: string;
}

// 1. LEFT SIDE: Tamil Boy standing with hands in his pockets
export function TamilBoyIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className || ''}`}
    >
      {/* Floor shadow */}
      <ellipse cx="120" cy="298" rx="75" ry="10" fill="url(#floor-shadow)" />

      {/* FEET & LEGS (Standing posture) */}
      <g id="boy-standing-legs">
        {/* Left Leg */}
        <rect x="85" y="222" width="12" height="42" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2" />
        {/* Left Sock (White with Red Stripe near the top) */}
        <rect x="84" y="252" width="14" height="20" rx="1" fill="#FFFFFF" stroke="#3A2318" strokeWidth="1.5" />
        <rect x="84.5" y="258" width="13" height="3" fill="#E74C3C" />
        {/* Left Black School Shoe */}
        <path
          d="M 72 284 C 72 272 88 270 94 270 C 100 270 102 276 102 286 C 102 294 84 294 72 292 Z"
          fill="#1C2833"
          stroke="#3A2318"
          strokeWidth="2"
        />
        {/* Left Shoe Sole */}
        <path d="M 72 290 C 72 290 85 294 102 290 C 102 292 98 295 87 295 C 76 295 72 292 72 292 Z" fill="#111111" />
        {/* Left Shoe Straps */}
        <path d="M 76 276 L 94 278" stroke="#3A2318" strokeWidth="4" strokeLinecap="round" />
        <path d="M 78 282 L 96 284" stroke="#3A2318" strokeWidth="4" strokeLinecap="round" />

        {/* Right Leg */}
        <rect x="143" y="222" width="12" height="42" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2" />
        {/* Right Sock (White with Red Stripe near the top) */}
        <rect x="142" y="252" width="14" height="20" rx="1" fill="#FFFFFF" stroke="#3A2318" strokeWidth="1.5" />
        <rect x="142.5" y="258" width="13" height="3" fill="#E74C3C" />
        {/* Right Black School Shoe */}
        <path
          d="M 168 284 C 168 272 152 270 146 270 C 140 270 138 276 138 286 C 138 294 156 294 168 292 Z"
          fill="#1C2833"
          stroke="#3A2318"
          strokeWidth="2"
        />
        {/* Right Shoe Sole */}
        <path d="M 168 290 C 168 290 155 294 138 290 C 138 292 142 295 153 295 C 164 295 168 292 168 292 Z" fill="#111111" />
        {/* Right Shoe Straps */}
        <path d="M 164 276 L 146 278" stroke="#3A2318" strokeWidth="4" strokeLinecap="round" />
        <path d="M 162 282 L 144 284" stroke="#3A2318" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* RED SHORTS (With pockets & crease stitching) */}
      <g id="boy-shorts">
        <path
          d="M 82 166 L 158 166 L 164 224 C 164 228 152 230 144 230 C 136 230 126 222 120 222 C 114 222 104 230 96 230 C 88 230 76 228 76 224 Z"
          fill="url(#red-uniform-grad)"
          stroke="#3A2318"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Shorts Pocket Slants */}
        <path d="M 82 180 C 95 183 98 200 94 212" stroke="#A93226" strokeWidth="2.5" fill="none" strokeDasharray="3,1" />
        <path d="M 158 180 C 145 183 142 200 146 212" stroke="#A93226" strokeWidth="2.5" fill="none" strokeDasharray="3,1" />
        {/* Zipper Fly Seam */}
        <path d="M 120 174 L 120 196 C 120 202 114 205 110 205" stroke="#3A2318" strokeWidth="1.5" fill="none" />
        {/* Front Creases */}
        <line x1="102" y1="184" x2="102" y2="224" stroke="#A93226" strokeWidth="1" />
        <line x1="138" y1="184" x2="138" y2="224" stroke="#A93226" strokeWidth="1" />
      </g>

      {/* TORSO / CHECKED SHIRT */}
      <g id="boy-shirt-body">
        {/* Checked Half Sleeve Shirt */}
        <path
          d="M 84 116 L 156 116 L 158 166 L 82 166 Z"
          fill="url(#uniform-checks)"
          stroke="#3A2318"
          strokeWidth="2.5"
        />

        {/* Collar Flaps (Red) */}
        <path d="M 120 115 L 94 125 L 104 112 Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />
        <path d="M 120 115 L 146 125 L 136 112 Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />

        {/* Red Button Placket */}
        <rect x="116" y="115" width="8" height="51" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />
        {/* Golden/Yellow Buttons */}
        <circle cx="120" cy="126" r="1.8" fill="#F4D03F" stroke="#3A2318" strokeWidth="0.5" />
        <circle cx="120" cy="138" r="1.8" fill="#F4D03F" stroke="#3A2318" strokeWidth="0.5" />
        <circle cx="120" cy="150" r="1.8" fill="#F4D03F" stroke="#3A2318" strokeWidth="0.5" />
        <circle cx="120" cy="162" r="1.8" fill="#F4D03F" stroke="#3A2318" strokeWidth="0.5" />

        {/* Left Sleeve (Checked) & Red Cuff Band */}
        <path d="M 84 116 L 56 138 L 70 150 L 84 135 Z" fill="url(#uniform-checks)" stroke="#3A2318" strokeWidth="2" />
        <path d="M 56 138 L 70 150 L 67 154 L 52 142 Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />

        {/* Right Sleeve (Checked) & Red Cuff Band */}
        <path d="M 156 116 L 184 138 L 170 150 L 156 135 Z" fill="url(#uniform-checks)" stroke="#3A2318" strokeWidth="2" />
        <path d="M 184 138 L 170 150 L 173 154 L 188 142 Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />

        {/* White Pocket with Logo Emblem on Left Chest */}
        <rect x="133" y="128" width="16" height="20" rx="1.5" fill="#FFFFFF" stroke="#3A2318" strokeWidth="1.5" />
        <rect x="133" y="128" width="16" height="3" fill="#E74C3C" stroke="#3A2318" strokeWidth="1" />
        {/* Tiny School Logo Mascot Representation */}
        <ellipse cx="141" cy="138" rx="3.5" ry="5.5" fill="#27AE60" />
        <circle cx="141" cy="133.5" r="2.2" fill="#F1C40F" />
        <rect x="135" y="132" width="12" height="12" fill="none" stroke="#E74C3C" strokeWidth="0.5" />
      </g>

      {/* ARMS & HANDS (Tucked inside shorts pockets) */}
      <g id="boy-arms-in-pockets">
        {/* Left Arm Outer Curve */}
        <path d="M 80 120 C 60 135 55 170 85 190" stroke="#3A2318" strokeWidth="11" strokeLinecap="round" fill="none" />
        <path d="M 80 120 C 60 135 55 170 85 190" stroke="url(#uniform-checks)" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* Left Wrist/Hand disappearing into pocket */}
        <path d="M 82 184 C 84 186 86 190 85 195" stroke="#3A2318" strokeWidth="8" strokeLinecap="round" />
        <path d="M 82 184 C 84 186 86 190 85 195" stroke="url(#skin-base-boy)" strokeWidth="5" strokeLinecap="round" />

        {/* Right Arm Outer Curve */}
        <path d="M 160 120 C 180 135 185 170 155 190" stroke="#3A2318" strokeWidth="11" strokeLinecap="round" fill="none" />
        <path d="M 160 120 C 180 135 185 170 155 190" stroke="url(#uniform-checks)" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* Right Wrist/Hand disappearing into pocket */}
        <path d="M 158 184 C 156 186 154 190 155 195" stroke="#3A2318" strokeWidth="8" strokeLinecap="round" />
        <path d="M 158 184 C 156 186 154 190 155 195" stroke="url(#skin-base-boy)" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* HEAD / FACE (Warm South Indian Features) */}
      <g id="boy-head">
        {/* Neck */}
        <rect x="109" y="96" width="22" height="18" rx="4" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2.5" />

        {/* Left & Right Ears */}
        <circle cx="70" cy="74" r="12" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2.5" />
        <path d="M 72 74 C 72 70 68 70 68 74" stroke="#8A4E27" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        <circle cx="170" cy="74" r="12" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2.5" />
        <path d="M 168 74 C 168 70 172 70 172 74" stroke="#8A4E27" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Chubby Head shape */}
        <path
          d="M 74 72 C 74 38 166 38 166 72 C 166 104 150 114 120 114 C 90 114 74 104 74 72 Z"
          fill="url(#skin-base-boy)"
          stroke="#3A2318"
          strokeWidth="2.5"
        />

        {/* Soft Pink Blush on cheeks */}
        <ellipse cx="88" cy="88" rx="10" ry="5" fill="#E74C3C" opacity="0.14" />
        <ellipse cx="152" cy="88" rx="10" ry="5" fill="#E74C3C" opacity="0.14" />

        {/* Large, Beautiful Expressive Eyes */}
        {/* Left Eye */}
        <circle cx="98" cy="73" r="12" fill="#FFFFFF" stroke="#3A2318" strokeWidth="2" />
        <circle cx="99.5" cy="73.5" r="7.5" fill="#42250F" />
        <circle cx="99.5" cy="73.5" r="4.5" fill="#0E0702" />
        <circle cx="102" cy="71" r="2.2" fill="#FFFFFF" />
        <circle cx="97" cy="76" r="1" fill="#FFFFFF" />

        {/* Right Eye */}
        <circle cx="142" cy="73" r="12" fill="#FFFFFF" stroke="#3A2318" strokeWidth="2" />
        <circle cx="140.5" cy="73.5" r="7.5" fill="#42250F" />
        <circle cx="140.5" cy="73.5" r="4.5" fill="#0E0702" />
        <circle cx="143" cy="71" r="2.2" fill="#FFFFFF" />
        <circle cx="138" cy="76" r="1" fill="#FFFFFF" />

        {/* Friendly Eyebrows */}
        <path d="M 83 58 C 90 53 98 56 103 59" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 157 58 C 150 53 142 56 137 59" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Cute Nose */}
        <path d="M 116 84 C 116 84 120 88 124 84" stroke="#8A4E27" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Warm Friendly Smile */}
        <path d="M 104 94 C 110 98 130 98 136 94" stroke="#3A2318" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 103 94 C 103 94 120 106 137 94" fill="#8A1B1B" stroke="#3A2318" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 108 97 C 115 101 125 101 132 97" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* COMBED HAIRSTYLE (Combed sideways/neat combed look) */}
        <g id="boy-combed-hair">
          {/* Base hair outline */}
          <path d="M 72 70 C 70 30 170 30 168 70 C 172 74 175 62 170 54 C 160 22 80 22 70 54 Z" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          {/* Layered volume */}
          <path d="M 68 64 C 68 34 100 12 144 20 C 172 26 176 46 174 64 C 172 68 165 52 152 46 C 132 38 100 42 76 66 Z" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1" />
          {/* Forehead hair locks */}
          <path d="M 74 62 C 86 52 110 48 122 56 C 110 58 84 64 74 62 Z" fill="#151515" />
          <path d="M 96 52 C 112 42 136 44 148 54 C 132 54 110 56 96 52 Z" fill="#222222" />
          <path d="M 126 44 C 142 42 162 48 168 62 C 158 58 140 56 126 44 Z" fill="#151515" />
          {/* Sideburns */}
          <path d="M 74 68 L 74 78 L 80 72 Z" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1" />
          <path d="M 166 68 L 166 78 L 160 72 Z" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
}

// 2. RIGHT SIDE: Tamil Girl sitting cross-legged reading a book
export function TamilGirlIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className || ''}`}
    >
      {/* Floor shadow */}
      <ellipse cx="120" cy="290" rx="90" ry="14" fill="url(#floor-shadow)" />

      {/* SITTING LEGS (Cross-legged posture) */}
      <g id="girl-crossed-legs">
        {/* Left folded knee */}
        <path
          d="M 40 280 C 30 280 25 250 50 240 C 70 230 110 260 110 280 C 110 285 70 285 40 280 Z"
          fill="url(#red-uniform-grad)"
          stroke="#3A2318"
          strokeWidth="2"
        />
        {/* Right folded knee */}
        <path
          d="M 200 280 C 210 280 215 250 190 240 C 170 230 130 260 130 280 C 130 285 170 285 200 280 Z"
          fill="url(#red-uniform-grad)"
          stroke="#3A2318"
          strokeWidth="2"
        />

        {/* Left Sock (White with Red Stripe) */}
        <path d="M 85 272 L 95 264 L 105 275 L 95 282 Z" fill="#FFFFFF" stroke="#3A2318" strokeWidth="1.5" />
        <path d="M 90 268 L 94 265" stroke="#E74C3C" strokeWidth="2" />
        {/* Left Black Shoe */}
        <path
          d="M 95 275 C 95 275 90 288 102 288 C 112 288 116 278 112 272 Z"
          fill="#2C3E50"
          stroke="#3A2318"
          strokeWidth="1.5"
        />

        {/* Right Sock (White with Red Stripe) */}
        <path d="M 155 272 L 145 264 L 135 275 L 145 282 Z" fill="#FFFFFF" stroke="#3A2318" strokeWidth="1.5" />
        <path d="M 150 268 L 146 265" stroke="#E74C3C" strokeWidth="2" />
        {/* Right Black Shoe */}
        <path
          d="M 145 275 C 145 275 150 288 138 288 C 128 288 124 278 128 272 Z"
          fill="#2C3E50"
          stroke="#3A2318"
          strokeWidth="1.5"
        />
      </g>

      {/* TORSO / RED PINAFORE OVER CHECKED SHIRT */}
      <g id="girl-torso">
        {/* Checked shirt base underneath pinafore */}
        <path
          d="M 74 180 L 166 180 L 160 245 C 160 255 145 260 120 260 C 95 260 80 255 80 245 Z"
          fill="url(#uniform-checks)"
          stroke="#3A2318"
          strokeWidth="2.5"
        />

        {/* Checked sleeves */}
        <path d="M 74 180 L 49 205 L 61 217 L 76 195 Z" fill="url(#uniform-checks)" stroke="#3A2318" strokeWidth="2" />
        <path d="M 166 180 L 191 205 L 179 217 L 164 195 Z" fill="url(#uniform-checks)" stroke="#3A2318" strokeWidth="2" />

        {/* RED PINAFORE SKIRT & BODICE */}
        {/* Straps / Bib */}
        <path
          d="M 88 180 L 100 180 L 98 225 L 86 225 Z"
          fill="url(#red-uniform-grad)"
          stroke="#3A2318"
          strokeWidth="1.5"
        />
        <path
          d="M 152 180 L 140 180 L 142 225 L 154 225 Z"
          fill="url(#red-uniform-grad)"
          stroke="#3A2318"
          strokeWidth="1.5"
        />
        {/* Pinafore Bib Center */}
        <rect x="96" y="195" width="48" height="30" rx="3" fill="url(#red-uniform-grad)" stroke="#3A2318" strokeWidth="2" />

        {/* Crest Logo Emblem on Chest of Pinafore Bib */}
        <polygon points="116,203 120,201 124,203 123,210 120,212 117,210" fill="url(#gold-grad)" stroke="#3A2318" strokeWidth="0.5" />

        {/* BLUE BELT around waist */}
        <rect x="78" y="240" width="84" height="8" rx="2" fill="#2980B9" stroke="#3A2318" strokeWidth="1.5" />
        <rect x="114" y="238" width="12" height="12" rx="2" fill="#F1C40F" stroke="#3A2318" strokeWidth="1.5" /> {/* Gold Buckle */}

        {/* Pinafore Skirt flares down */}
        <path
          d="M 78 248 L 65 268 C 65 268 90 274 120 274 C 150 274 175 268 175 268 L 162 248 Z"
          fill="url(#red-uniform-grad)"
          stroke="#3A2318"
          strokeWidth="2.5"
        />
      </g>

      {/* ARMS & OPEN BLUE BOOK */}
      <g id="girl-arms-book">
        {/* Left hand & arm */}
        <path d="M 52 215 C 52 215 50 240 75 245" stroke="#3A2318" strokeWidth="10" strokeLinecap="round" />
        <path d="M 52 215 C 52 215 50 240 75 245" stroke="url(#uniform-checks)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="75" cy="245" r="7" fill="url(#skin-base-girl)" stroke="#3A2318" strokeWidth="1.5" />

        {/* Right hand & arm */}
        <path d="M 188 215 C 188 215 190 240 165 245" stroke="#3A2318" strokeWidth="10" strokeLinecap="round" />
        <path d="M 188 215 C 188 215 190 240 165 245" stroke="url(#uniform-checks)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="165" cy="245" r="7" fill="url(#skin-base-girl)" stroke="#3A2318" strokeWidth="1.5" />

        {/* THE OPEN BOOK (Blue Cover) */}
        <g id="open-blue-book">
          {/* Blue Outer Cover */}
          <path
            d="M 65 245 L 120 252 L 175 245 L 178 225 L 120 231 L 62 225 Z"
            fill="url(#book-blue)"
            stroke="#3A2318"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Book Pages (Left Page) */}
          <path
            d="M 68 241 C 85 241 100 246 118 248 L 118 228 C 100 226 85 221 65 221 Z"
            fill="#FFFFFF"
            stroke="#3A2318"
            strokeWidth="1.5"
          />
          {/* Book Pages (Right Page) */}
          <path
            d="M 172 241 C 155 241 140 246 122 248 L 122 228 C 140 226 155 221 175 221 Z"
            fill="#FFFFFF"
            stroke="#3A2318"
            strokeWidth="1.5"
          />
          {/* Reading lines */}
          <line x1="74" y1="228" x2="106" y2="231" stroke="#BDC3C7" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="74" y1="234" x2="100" y2="237" stroke="#BDC3C7" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="134" y1="231" x2="166" y2="228" stroke="#BDC3C7" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="140" y1="237" x2="166" y2="234" stroke="#BDC3C7" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Cute leaf drawing on page */}
          <path d="M 88 235 C 92 232 94 235 94 235 C 94 235 90 238 88 235 Z" fill="#2ECC71" />
        </g>
      </g>

      {/* HEAD / FACE (Pixar style with South Indian features, braids, red bindi) */}
      <g id="girl-head">
        {/* Neck */}
        <rect x="108" y="152" width="24" height="20" rx="5" fill="url(#skin-base-girl)" stroke="#3A2318" strokeWidth="2.5" />

        {/* Left & Right Ears */}
        <circle cx="70" cy="120" r="11" fill="url(#skin-base-girl)" stroke="#3A2318" strokeWidth="2" />
        <circle cx="170" cy="120" r="11" fill="url(#skin-base-girl)" stroke="#3A2318" strokeWidth="2" />

        {/* Chubby Head shape */}
        <path
          d="M 72 115 C 72 75 168 75 168 115 C 168 152 150 162 120 162 C 90 162 72 152 72 115 Z"
          fill="url(#skin-base-girl)"
          stroke="#3A2318"
          strokeWidth="2.5"
        />

        {/* SMALL RED BINDI (Forehead dot) */}
        <circle cx="120" cy="108" r="3" fill="#C0392B" />

        {/* Soft Pink Blush on cheeks */}
        <ellipse cx="88" cy="132" rx="10" ry="6" fill="#E74C3C" opacity="0.15" />
        <ellipse cx="152" cy="132" rx="10" ry="6" fill="#E74C3C" opacity="0.15" />

        {/* Large, Beautiful Expressive Eyes */}
        {/* Left Eye */}
        <circle cx="98" cy="115" r="13" fill="#FFFFFF" stroke="#3A2318" strokeWidth="2" />
        <circle cx="100" cy="115" r="8" fill="#5D3A1A" /> {/* Dark Brown Iris */}
        <circle cx="100" cy="115" r="5" fill="#000000" /> {/* Pupil */}
        <circle cx="103" cy="112" r="2.5" fill="#FFFFFF" /> {/* Highlight */}
        <circle cx="97" cy="118" r="1" fill="#FFFFFF" />

        {/* Right Eye */}
        <circle cx="142" cy="115" r="13" fill="#FFFFFF" stroke="#3A2318" strokeWidth="2" />
        <circle cx="140" cy="115" r="8" fill="#5D3A1A" /> {/* Dark Brown Iris */}
        <circle cx="140" cy="115" r="5" fill="#000000" /> {/* Pupil */}
        <circle cx="143" cy="112" r="2.5" fill="#FFFFFF" /> {/* Highlight */}
        <circle cx="137" cy="118" r="1" fill="#FFFFFF" />

        {/* Eyelashes for Cute Girl Pixar Look */}
        <path d="M 85 108 L 82 104" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
        <path d="M 111 108 L 114 104" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
        <path d="M 129 108 L 126 104" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
        <path d="M 155 108 L 158 104" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />

        {/* Friendly Eyebrows */}
        <path d="M 83 100 C 90 95 98 98 103 101" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
        <path d="M 157 100 C 150 95 142 98 137 101" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />

        {/* Cute Nose */}
        <path d="M 116 126 C 116 126 120 130 124 126" stroke="#B57648" strokeWidth="2.5" strokeLinecap="round" />

        {/* Wide Happy Smile */}
        <path
          d="M 102 136 C 102 136 120 152 138 136"
          fill="#8A1B1B"
          stroke="#3A2318"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path d="M 107 139 C 114 142 126 142 133 139" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        {/* Shiny Black Hair with Side Parts */}
        <path
          d="M 72 110 C 72 70 168 70 168 110 C 168 110 155 85 120 85 C 85 85 72 110 72 110 Z"
          fill="url(#hair-main)"
          stroke="#3A2318"
          strokeWidth="2"
        />
        {/* Hair line highlights */}
        <path d="M 120 85 C 120 85 110 95 90 102" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M 120 85 C 120 85 130 95 150 102" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* TWO BRAIDED PONYTAILS WITH RED RIBBONS */}
        {/* Left Braid coming down */}
        <g id="left-braid">
          {/* Base ribbon */}
          <circle cx="68" cy="122" r="6" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />
          <path d="M 64 122 L 58 128 M 72 122 L 78 128" stroke="#E74C3C" strokeWidth="3" strokeLinecap="round" /> {/* Ribbons */}
          {/* Braided segments */}
          <ellipse cx="64" cy="138" rx="8" ry="10" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          <ellipse cx="58" cy="154" rx="8" ry="10" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          <ellipse cx="54" cy="170" rx="6" ry="8" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          {/* End Red Ribbon */}
          <circle cx="52" cy="178" r="4" fill="#E74C3C" stroke="#3A2318" strokeWidth="1" />
          <path d="M 50 182 L 46 188 M 54 182 L 58 188" stroke="#E74C3C" strokeWidth="2" />
        </g>

        {/* Right Braid coming down */}
        <g id="right-braid">
          {/* Base ribbon */}
          <circle cx="172" cy="122" r="6" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />
          <path d="M 168 122 L 162 128 M 176 122 L 182 128" stroke="#E74C3C" strokeWidth="3" strokeLinecap="round" />
          {/* Braided segments */}
          <ellipse cx="176" cy="138" rx="8" ry="10" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          <ellipse cx="182" cy="154" rx="8" ry="10" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          <ellipse cx="186" cy="170" rx="6" ry="8" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          {/* End Red Ribbon */}
          <circle cx="188" cy="178" r="4" fill="#E74C3C" stroke="#3A2318" strokeWidth="1" />
          <path d="M 186 182 L 182 188 M 190 182 L 194 188" stroke="#E74C3C" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}

// 3. Tamil Girl standing confidently holding books above her head
export function TamilGirlWithBooks({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className || ''}`}
    >
      {/* Floor shadow */}
      <ellipse cx="120" cy="298" rx="75" ry="10" fill="url(#floor-shadow)" />

      {/* FEET & LEGS (Standing posture) */}
      <g id="girl-standing-legs">
        {/* Left Leg */}
        <rect x="90" y="222" width="12" height="42" fill="url(#skin-base-girl)" stroke="#3A2318" strokeWidth="2" />
        {/* Left Sock */}
        <rect x="89" y="252" width="14" height="20" rx="1" fill="#FFFFFF" stroke="#3A2318" strokeWidth="1.5" />
        <rect x="89.5" y="258" width="13" height="3" fill="#E74C3C" />
        {/* Left Black School Shoe */}
        <path
          d="M 77 284 C 77 272 93 270 99 270 C 105 270 107 276 107 286 C 107 294 89 294 77 292 Z"
          fill="#1C2833"
          stroke="#3A2318"
          strokeWidth="2"
        />
        <path d="M 77 290 C 77 290 90 294 107 290 C 107 292 103 295 92 295 C 81 295 77 292 77 292 Z" fill="#111111" />

        {/* Right Leg */}
        <rect x="138" y="222" width="12" height="42" fill="url(#skin-base-girl)" stroke="#3A2318" strokeWidth="2" />
        {/* Right Sock */}
        <rect x="137" y="252" width="14" height="20" rx="1" fill="#FFFFFF" stroke="#3A2318" strokeWidth="1.5" />
        <rect x="137.5" y="258" width="13" height="3" fill="#E74C3C" />
        {/* Right Black School Shoe */}
        <path
          d="M 163 284 C 163 272 147 270 141 270 C 135 270 133 276 133 286 C 133 294 151 294 163 292 Z"
          fill="#1C2833"
          stroke="#3A2318"
          strokeWidth="2"
        />
        <path d="M 163 290 C 163 290 150 294 133 290 C 133 292 137 295 148 295 C 159 295 163 292 163 292 Z" fill="#111111" />
      </g>

      {/* TORSO / RED PINAFORE SKIRT & BODICE */}
      <g id="girl-torso">
        {/* Checked shirt base underneath */}
        <path
          d="M 84 125 L 156 125 L 154 180 C 154 185 145 190 120 190 C 95 190 86 185 86 180 Z"
          fill="url(#uniform-checks)"
          stroke="#3A2318"
          strokeWidth="2.5"
        />

        {/* Checked sleeves (raised up) */}
        <path d="M 84 125 L 60 95 L 72 85 L 94 110 Z" fill="url(#uniform-checks)" stroke="#3A2318" strokeWidth="2" />
        <path d="M 156 125 L 180 95 L 168 85 L 146 110 Z" fill="url(#uniform-checks)" stroke="#3A2318" strokeWidth="2" />

        {/* RED PINAFORE */}
        {/* Straps / Bib */}
        <path d="M 94 125 L 104 125 L 102 166 L 92 166 Z" fill="url(#red-uniform-grad)" stroke="#3A2318" strokeWidth="1.5" />
        <path d="M 146 125 L 136 125 L 138 166 L 148 166 Z" fill="url(#red-uniform-grad)" stroke="#3A2318" strokeWidth="1.5" />
        {/* Pinafore Bib Center */}
        <rect x="100" y="136" width="40" height="26" rx="2" fill="url(#red-uniform-grad)" stroke="#3A2318" strokeWidth="2" />
        {/* Logo Emblem */}
        <polygon points="117,143 120,141 123,143 122.5,148 120,150 117.5,148" fill="url(#gold-grad)" stroke="#3A2318" strokeWidth="0.5" />

        {/* BLUE BELT */}
        <rect x="84" y="174" width="72" height="8" rx="2" fill="#2980B9" stroke="#3A2318" strokeWidth="1.5" />
        <rect x="114" y="172" width="12" height="12" rx="2" fill="#F1C40F" stroke="#3A2318" strokeWidth="1.5" />

        {/* Pinafore Skirt flares down */}
        <path
          d="M 84 182 L 72 225 C 72 225 95 231 120 231 C 145 231 168 225 168 225 L 156 182 Z"
          fill="url(#red-uniform-grad)"
          stroke="#3A2318"
          strokeWidth="2.5"
        />
      </g>

      {/* BOOKS HELD ABOVE HEAD */}
      <g id="books-above-head">
        {/* Orange Book */}
        <path
          d="M 85 45 L 155 45 L 150 32 L 80 32 Z"
          fill="url(#book-orange)"
          stroke="#3A2318"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* White pages under orange book */}
        <path d="M 84 41 L 151 41" stroke="#FFFFFF" strokeWidth="3" />
        
        {/* Blue Book on top of Orange Book */}
        <path
          d="M 95 32 L 145 32 L 140 20 L 90 20 Z"
          fill="url(#book-blue)"
          stroke="#3A2318"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* White pages under blue book */}
        <path d="M 94 28 L 141 28" stroke="#FFFFFF" strokeWidth="3" />
      </g>

      {/* ARMS (Reaching up to hold books) */}
      <g id="girl-arms-up">
        {/* Left Arm and Hand */}
        <path d="M 80 120 C 65 100 60 70 78 48" stroke="#3A2318" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M 80 120 C 65 100 60 70 78 48" stroke="url(#uniform-checks)" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="78" cy="48" r="6" fill="url(#skin-base-girl)" stroke="#3A2318" strokeWidth="1.5" />

        {/* Right Arm and Hand */}
        <path d="M 160 120 C 175 100 180 70 162 48" stroke="#3A2318" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M 160 120 C 175 100 180 70 162 48" stroke="url(#uniform-checks)" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="162" cy="48" r="6" fill="url(#skin-base-girl)" stroke="#3A2318" strokeWidth="1.5" />
      </g>

      {/* HEAD / FACE (Tamil Girl details) */}
      <g id="girl-head">
        {/* Neck */}
        <rect x="109" y="102" width="22" height="18" rx="4" fill="url(#skin-base-girl)" stroke="#3A2318" strokeWidth="2.5" />

        {/* Left & Right Ears */}
        <circle cx="70" cy="80" r="11" fill="url(#skin-base-girl)" stroke="#3A2318" strokeWidth="2" />
        <circle cx="170" cy="80" r="11" fill="url(#skin-base-girl)" stroke="#3A2318" strokeWidth="2" />

        {/* Chubby Head shape */}
        <path
          d="M 72 75 C 72 35 168 35 168 75 C 168 112 150 122 120 122 C 90 122 72 112 72 75 Z"
          fill="url(#skin-base-girl)"
          stroke="#3A2318"
          strokeWidth="2.5"
        />

        {/* SMALL RED BINDI */}
        <circle cx="120" cy="68" r="3" fill="#C0392B" />

        {/* Soft Pink Blush */}
        <ellipse cx="88" cy="92" rx="10" ry="6" fill="#E74C3C" opacity="0.15" />
        <ellipse cx="152" cy="92" rx="10" ry="6" fill="#E74C3C" opacity="0.15" />

        {/* Large Expressive Eyes */}
        <circle cx="98" cy="75" r="13" fill="#FFFFFF" stroke="#3A2318" strokeWidth="2" />
        <circle cx="100" cy="75" r="8" fill="#5D3A1A" />
        <circle cx="100" cy="75" r="5" fill="#000000" />
        <circle cx="103" cy="72" r="2.5" fill="#FFFFFF" />
        <circle cx="97" cy="78" r="1" fill="#FFFFFF" />

        <circle cx="142" cy="75" r="13" fill="#FFFFFF" stroke="#3A2318" strokeWidth="2" />
        <circle cx="140" cy="75" r="8" fill="#5D3A1A" />
        <circle cx="140" cy="75" r="5" fill="#000000" />
        <circle cx="143" cy="72" r="2.5" fill="#FFFFFF" />
        <circle cx="137" cy="78" r="1" fill="#FFFFFF" />

        {/* Eyebrows */}
        <path d="M 83 60 C 90 55 98 58 103 61" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
        <path d="M 157 60 C 150 55 142 58 137 61" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />

        {/* Cute Smile */}
        <path d="M 102 96 C 102 96 120 112 138 96" fill="#8A1B1B" stroke="#3A2318" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 107 99 C 114 102 126 102 133 99" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        {/* Hair */}
        <path
          d="M 72 70 C 72 30 168 30 168 70 C 168 70 155 45 120 45 C 85 45 72 70 72 70 Z"
          fill="url(#hair-main)"
          stroke="#3A2318"
          strokeWidth="2"
        />

        {/* Two braided ponytails hanging down */}
        <g id="girl-braids-hanging">
          {/* Left Braid */}
          <ellipse cx="64" cy="104" rx="8" ry="10" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          <ellipse cx="58" cy="120" rx="8" ry="10" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          <ellipse cx="54" cy="136" rx="6" ry="8" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          <circle cx="52" cy="144" r="4" fill="#E74C3C" stroke="#3A2318" strokeWidth="1" />
          <path d="M 50 148 L 46 154" stroke="#E74C3C" strokeWidth="2" />

          {/* Right Braid */}
          <ellipse cx="176" cy="104" rx="8" ry="10" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          <ellipse cx="182" cy="120" rx="8" ry="10" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          <ellipse cx="186" cy="136" rx="6" ry="8" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          <circle cx="188" cy="144" r="4" fill="#E74C3C" stroke="#3A2318" strokeWidth="1" />
          <path d="M 186 148 L 182 154" stroke="#E74C3C" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}

// 4. Tamil Boy standing with a skateboard resting behind his shoulders
export function TamilBoyWithSkateboard({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className || ''}`}
    >
      {/* Floor shadow */}
      <ellipse cx="120" cy="298" rx="75" ry="10" fill="url(#floor-shadow)" />

      {/* FEET & LEGS */}
      <g id="boy-legs">
        {/* Left Leg */}
        <rect x="85" y="222" width="12" height="42" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2" />
        <rect x="84" y="252" width="14" height="20" rx="1" fill="#FFFFFF" stroke="#3A2318" strokeWidth="1.5" />
        <rect x="84.5" y="258" width="13" height="3" fill="#E74C3C" />
        <path
          d="M 72 284 C 72 272 88 270 94 270 C 100 270 102 276 102 286 C 102 294 84 294 72 292 Z"
          fill="#1C2833"
          stroke="#3A2318"
          strokeWidth="2"
        />
        <path d="M 72 290 C 72 290 85 294 102 290 C 102 292 98 295 87 295 C 76 295 72 292 72 292 Z" fill="#111111" />

        {/* Right Leg */}
        <rect x="143" y="222" width="12" height="42" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2" />
        <rect x="142" y="252" width="14" height="20" rx="1" fill="#FFFFFF" stroke="#3A2318" strokeWidth="1.5" />
        <rect x="142.5" y="258" width="13" height="3" fill="#E74C3C" />
        <path
          d="M 168 284 C 168 272 152 270 146 270 C 140 270 138 276 138 286 C 138 294 156 294 168 292 Z"
          fill="#1C2833"
          stroke="#3A2318"
          strokeWidth="2"
        />
        <path d="M 168 290 C 168 290 155 294 138 290 C 138 292 142 295 153 295 C 164 295 168 292 168 292 Z" fill="#111111" />
      </g>

      {/* RED SHORTS */}
      <g id="boy-shorts">
        <path
          d="M 82 166 L 158 166 L 164 224 C 164 228 152 230 144 230 C 136 230 126 222 120 222 C 114 222 104 230 96 230 C 88 230 76 228 76 224 Z"
          fill="url(#red-uniform-grad)"
          stroke="#3A2318"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>

      {/* SHIRT BODY */}
      <g id="boy-shirt">
        <path
          d="M 84 125 L 156 125 L 158 166 L 82 166 Z"
          fill="url(#uniform-checks)"
          stroke="#3A2318"
          strokeWidth="2.5"
        />
        {/* Collar Flaps */}
        <path d="M 120 124 L 94 134 L 104 121 Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />
        <path d="M 120 124 L 146 134 L 136 121 Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />

        {/* Left and Right sleeves */}
        <path d="M 84 125 L 56 142 L 68 154 L 84 138 Z" fill="url(#uniform-checks)" stroke="#3A2318" strokeWidth="2" />
        <path d="M 156 125 L 184 142 L 172 154 L 156 138 Z" fill="url(#uniform-checks)" stroke="#3A2318" strokeWidth="2" />
      </g>

      {/* SKATEBOARD BEHIND SHOULDERS */}
      <g id="skateboard">
        {/* Green Skateboard Deck */}
        <rect
          x="30"
          y="112"
          width="180"
          height="16"
          rx="8"
          fill="#198C52"
          stroke="#3A2318"
          strokeWidth="2.5"
        />
        {/* Cute design stripe on skateboard */}
        <line x1="45" y1="120" x2="195" y2="120" stroke="#F4D03F" strokeWidth="2" />
        {/* Skateboard Wheels on the back */}
        <circle cx="48" cy="132" r="6" fill="#1C2833" stroke="#3A2318" strokeWidth="1.5" />
        <circle cx="192" cy="132" r="6" fill="#1C2833" stroke="#3A2318" strokeWidth="1.5" />
      </g>

      {/* ARMS (Draped over the skateboard) */}
      <g id="boy-arms-skate">
        {/* Left Arm and Hand */}
        <path d="M 80 124 C 65 110 45 110 48 126" stroke="#3A2318" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M 80 124 C 65 110 45 110 48 126" stroke="url(#uniform-checks)" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="48" cy="126" r="6.5" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="1.5" />

        {/* Right Arm and Hand */}
        <path d="M 160 124 C 175 110 195 110 192 126" stroke="#3A2318" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M 160 124 C 175 110 195 110 192 126" stroke="url(#uniform-checks)" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="192" cy="126" r="6.5" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="1.5" />
      </g>

      {/* HEAD / FACE */}
      <g id="boy-head">
        <rect x="109" y="102" width="22" height="18" rx="4" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2.5" />
        
        {/* Ears */}
        <circle cx="70" cy="80" r="11" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2" />
        <circle cx="170" cy="80" r="11" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2" />

        {/* Head Shape */}
        <path
          d="M 74 78 C 74 44 166 44 166 78 C 166 110 150 120 120 120 C 90 120 74 110 74 78 Z"
          fill="url(#skin-base-boy)"
          stroke="#3A2318"
          strokeWidth="2.5"
        />

        {/* Blush */}
        <ellipse cx="88" cy="94" rx="10" ry="5" fill="#E74C3C" opacity="0.14" />
        <ellipse cx="152" cy="94" rx="10" ry="5" fill="#E74C3C" opacity="0.14" />

        {/* Eyes */}
        <circle cx="98" cy="79" r="12" fill="#FFFFFF" stroke="#3A2318" strokeWidth="2" />
        <circle cx="99.5" cy="79.5" r="7.5" fill="#42250F" />
        <circle cx="99.5" cy="79.5" r="4.5" fill="#0E0702" />
        <circle cx="102" cy="77" r="2.2" fill="#FFFFFF" />

        <circle cx="142" cy="79" r="12" fill="#FFFFFF" stroke="#3A2318" strokeWidth="2" />
        <circle cx="140.5" cy="79.5" r="7.5" fill="#42250F" />
        <circle cx="140.5" cy="79.5" r="4.5" fill="#0E0702" />
        <circle cx="143" cy="77" r="2.2" fill="#FFFFFF" />

        {/* Eyebrows */}
        <path d="M 83 64 C 90 59 98 62 103 65" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 157 64 C 150 59 142 62 137 65" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Smile */}
        <path d="M 103 98 C 103 98 120 110 137 98" fill="#8A1B1B" stroke="#3A2318" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 108 101 C 115 105 125 105 132 101" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Combed Hair */}
        <g id="boy-combed-hair">
          <path d="M 72 76 C 70 36 170 36 168 76 C 172 80 175 68 170 60 C 160 28 80 28 70 60 Z" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          <path d="M 68 70 C 68 40 100 18 144 26 C 172 32 176 52 174 70 C 172 74 165 58 152 52 Z" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
}

// 5. Tamil Boy standing confidently holding his backpack straps
export function TamilBoyWithBackpack({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className || ''}`}
    >
      {/* Floor shadow */}
      <ellipse cx="120" cy="298" rx="75" ry="10" fill="url(#floor-shadow)" />

      {/* FEET & LEGS */}
      <g id="boy-legs">
        {/* Left Leg */}
        <rect x="85" y="222" width="12" height="42" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2" />
        <rect x="84" y="252" width="14" height="20" rx="1" fill="#FFFFFF" stroke="#3A2318" strokeWidth="1.5" />
        <rect x="84.5" y="258" width="13" height="3" fill="#E74C3C" />
        <path
          d="M 72 284 C 72 272 88 270 94 270 C 100 270 102 276 102 286 C 102 294 84 294 72 292 Z"
          fill="#1C2833"
          stroke="#3A2318"
          strokeWidth="2"
        />
        <path d="M 72 290 C 72 290 85 294 102 290 C 102 292 98 295 87 295 C 76 295 72 292 72 292 Z" fill="#111111" />

        {/* Right Leg */}
        <rect x="143" y="222" width="12" height="42" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2" />
        <rect x="142" y="252" width="14" height="20" rx="1" fill="#FFFFFF" stroke="#3A2318" strokeWidth="1.5" />
        <rect x="142.5" y="258" width="13" height="3" fill="#E74C3C" />
        <path
          d="M 168 284 C 168 272 152 270 146 270 C 140 270 138 276 138 286 C 138 294 156 294 168 292 Z"
          fill="#1C2833"
          stroke="#3A2318"
          strokeWidth="2"
        />
        <path d="M 168 290 C 168 290 155 294 138 290 C 138 292 142 295 153 295 C 164 295 168 292 168 292 Z" fill="#111111" />
      </g>

      {/* RED SHORTS */}
      <g id="boy-shorts">
        <path
          d="M 82 166 L 158 166 L 164 224 C 164 228 152 230 144 230 C 136 230 126 222 120 222 C 114 222 104 230 96 230 C 88 230 76 228 76 224 Z"
          fill="url(#red-uniform-grad)"
          stroke="#3A2318"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>

      {/* SHIRT BODY */}
      <g id="boy-shirt">
        <path
          d="M 84 125 L 156 125 L 158 166 L 82 166 Z"
          fill="url(#uniform-checks)"
          stroke="#3A2318"
          strokeWidth="2.5"
        />
        {/* Collar Flaps */}
        <path d="M 120 124 L 94 134 L 104 121 Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />
        <path d="M 120 124 L 146 134 L 136 121 Z" fill="#E74C3C" stroke="#3A2318" strokeWidth="1.5" />

        {/* Sleeves */}
        <path d="M 84 125 L 56 142 L 68 154 L 84 138 Z" fill="url(#uniform-checks)" stroke="#3A2318" strokeWidth="2" />
        <path d="M 156 125 L 184 142 L 172 154 L 156 138 Z" fill="url(#uniform-checks)" stroke="#3A2318" strokeWidth="2" />
      </g>

      {/* BACKPACK STRAPS */}
      <g id="backpack-straps">
        {/* Left strap */}
        <path d="M 94 125 C 85 135 85 155 92 166" stroke="#2980B9" strokeWidth="6.5" fill="none" strokeLinecap="round" />
        <path d="M 94 125 C 85 135 85 155 92 166" stroke="#F1C40F" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Right strap */}
        <path d="M 146 125 C 155 135 155 155 148 166" stroke="#2980B9" strokeWidth="6.5" fill="none" strokeLinecap="round" />
        <path d="M 146 125 C 155 135 155 155 148 166" stroke="#F1C40F" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* ARMS & HANDS HOLDING STRAPS */}
      <g id="boy-arms-holding-straps">
        {/* Left Arm and Hand */}
        <path d="M 84 125 C 72 135 72 150 88 152" stroke="#3A2318" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M 84 125 C 72 135 72 150 88 152" stroke="url(#uniform-checks)" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* Hand gripping strap */}
        <circle cx="88" cy="152" r="6.5" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="1.5" />

        {/* Right Arm and Hand */}
        <path d="M 156 125 C 168 135 168 150 152 152" stroke="#3A2318" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M 156 125 C 168 135 168 150 152 152" stroke="url(#uniform-checks)" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* Hand gripping strap */}
        <circle cx="152" cy="152" r="6.5" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="1.5" />
      </g>

      {/* HEAD / FACE */}
      <g id="boy-head">
        <rect x="109" y="102" width="22" height="18" rx="4" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2.5" />
        
        {/* Ears */}
        <circle cx="70" cy="80" r="11" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2" />
        <circle cx="170" cy="80" r="11" fill="url(#skin-base-boy)" stroke="#3A2318" strokeWidth="2" />

        {/* Head Shape */}
        <path
          d="M 74 78 C 74 44 166 44 166 78 C 166 110 150 120 120 120 C 90 120 74 110 74 78 Z"
          fill="url(#skin-base-boy)"
          stroke="#3A2318"
          strokeWidth="2.5"
        />

        {/* Blush */}
        <ellipse cx="88" cy="94" rx="10" ry="5" fill="#E74C3C" opacity="0.14" />
        <ellipse cx="152" cy="94" rx="10" ry="5" fill="#E74C3C" opacity="0.14" />

        {/* Eyes */}
        <circle cx="98" cy="79" r="12" fill="#FFFFFF" stroke="#3A2318" strokeWidth="2" />
        <circle cx="99.5" cy="79.5" r="7.5" fill="#42250F" />
        <circle cx="99.5" cy="79.5" r="4.5" fill="#0E0702" />
        <circle cx="102" cy="77" r="2.2" fill="#FFFFFF" />

        <circle cx="142" cy="79" r="12" fill="#FFFFFF" stroke="#3A2318" strokeWidth="2" />
        <circle cx="140.5" cy="79.5" r="7.5" fill="#42250F" />
        <circle cx="140.5" cy="79.5" r="4.5" fill="#0E0702" />
        <circle cx="143" cy="77" r="2.2" fill="#FFFFFF" />

        {/* Eyebrows */}
        <path d="M 83 64 C 90 59 98 62 103 65" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 157 64 C 150 59 142 62 137 65" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Smile */}
        <path d="M 103 98 C 103 98 120 110 137 98" fill="#8A1B1B" stroke="#3A2318" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 108 101 C 115 105 125 105 132 101" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Combed Hair */}
        <g id="boy-combed-hair">
          <path d="M 72 76 C 70 36 170 36 168 76 C 172 80 175 68 170 60 C 160 28 80 28 70 60 Z" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1.5" />
          <path d="M 68 70 C 68 40 100 18 144 26 C 172 32 176 52 174 70 C 172 74 165 58 152 52 Z" fill="url(#hair-main)" stroke="#3A2318" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
}
