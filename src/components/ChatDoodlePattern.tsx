import React from 'react';

/**
 * Subtle educational doodle background pattern for V-Leo Chat conversation area.
 * Hand-drawn school motifs: books, pencils, paper planes, stars, clouds, school bags,
 * ABC, 123, math symbols (+, -, ÷, =, π, √), and Tamil letter motifs (அ, ஆ).
 * Rendered at 5-6% opacity with pointer-events: none.
 */
export default function ChatDoodlePattern() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-[0.065]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280' viewBox='0 0 280 280'%3E%3Cg fill='none' stroke='%23422A21' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'%3E%3C!-- Open Book --%3E%3Cpath d='M25 45 C35 40 45 42 55 45 C65 42 75 40 85 45 L85 65 C75 60 65 62 55 65 C45 62 35 60 25 65 Z' /%3E%3Cpath d='M55 45 L55 65' /%3E%3C!-- Pencil --%3E%3Cpath d='M140 25 L165 50 L160 55 L135 30 Z' /%3E%3Cpath d='M135 30 L128 32 L133 37 Z' /%3E%3C!-- Paper Plane --%3E%3Cpath d='M215 35 L255 45 L228 65 L225 50 Z' /%3E%3Cpath d='M225 50 L255 45' /%3E%3Cpath d='M205 38 Q208 42 212 40' stroke-dasharray='2 2' /%3E%3C!-- Small Star --%3E%3Cpolygon points='105,85 107,90 112,91 108,94 109,99 105,96 101,99 102,94 98,91 103,90' fill='%23422A21' stroke='none' /%3E%3C!-- ABC Lettering --%3E%3Ctext x='30' y='115' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23422A21' stroke='none'%3EABC%3C/text%3E%3C!-- Tiny Math Symbols --%3E%3Ctext x='160' y='110' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23422A21' stroke='none'%3E%2B %E2%88%92 %C3%97 %C3%B7%3C/text%3E%3C!-- Tamil Letter 'அ' (A) --%3E%3Ctext x='225' y='120' font-family='serif' font-size='16' font-weight='bold' fill='%23422A21' stroke='none'%3E%E0%AE%85%3C/text%3E%3C!-- Small Cloud --%3E%3Cpath d='M75 160 C70 160 65 155 68 150 C66 142 75 138 80 142 C85 136 96 138 98 145 C104 145 106 153 101 158 C100 160 92 160 75 160 Z' /%3E%3C!-- School Backpack --%3E%3Cpath d='M145 165 C145 152 150 148 165 148 C180 148 185 152 185 165 L187 190 C187 193 183 195 180 195 L150 195 C147 195 143 193 143 190 Z' /%3E%3Cpath d='M153 148 C153 142 157 140 165 140 C173 140 177 142 177 148' /%3E%3Cpath d='M150 170 L180 170' /%3E%3Cpath d='M152 176 L178 176 L178 188 L152 188 Z' /%3E%3C!-- 1 2 3 --%3E%3Ctext x='220' y='180' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23422A21' stroke='none'%3E123%3C/text%3E%3C!-- Pi and Square Root --%3E%3Ctext x='35' y='245' font-family='serif' font-size='14' font-weight='bold' fill='%23422A21' stroke='none'%3E%CF%80 %E2%88%9A =%3C/text%3E%3C!-- Tamil Letter 'ஆ' (Aa) --%3E%3Ctext x='110' y='248' font-family='serif' font-size='16' font-weight='bold' fill='%23422A21' stroke='none'%3E%E0%AE%86%3C/text%3E%3C!-- Graduation Cap / Mortarboard --%3E%3Cpolygon points='195,230 225,220 255,230 225,240' /%3E%3Cpath d='M205 235 L205 248 C205 254 245 254 245 248 L245 235' /%3E%3Cpath d='M245 235 L255 245' /%3E%3C!-- Idea Sparkles --%3E%3Cpath d='M15 185 L18 195 L28 198 L18 201 L15 211 L12 201 L2 198 L12 195 Z' fill='%23422A21' stroke='none' /%3E%3Cpath d='M255 95 L257 101 L263 103 L257 105 L255 111 L253 105 L247 103 L253 101 Z' fill='%23422A21' stroke='none' /%3E%3C!-- Small Ruler --%3E%3Crect x='150' y='240' width='35' height='10' rx='1' /%3E%3Cline x1='157' y1='240' x2='157' y2='244' /%3E%3Cline x1='164' y1='240' x2='164' y2='246' /%3E%3Cline x1='171' y1='240' x2='171' y2='244' /%3E%3Cline x1='178' y1='240' x2='178' y2='246' /%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '240px 240px',
      }}
    />
  );
}
