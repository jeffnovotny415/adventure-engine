import { useId } from 'react';
import { ease, eyeColor, phase, transferCount } from './motionTiming';

const blue = '#65caff', gold = '#ffd979';
function Glow({ x, y, r = 45, color = blue, opacity = 1 }) {
  const id = useId().replace(/:/g, '');
  return <g opacity={opacity}><defs><radialGradient id={id}><stop offset="0" stopColor="#fff7e6" stopOpacity=".8" /><stop offset=".18" stopColor={color} stopOpacity=".55" /><stop offset=".5" stopColor={color} stopOpacity=".2" /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient></defs><circle cx={x} cy={y} r={r} fill={`url(#${id})`} /></g>;
}
function Dust({ p, x, y, width = 350 }) {
  return Array.from({ length: 20 }, (_, i) => {
    const t = phase(p, (i % 5) * .055, .72 + (i % 4) * .08);
    return <g key={i} opacity={Math.sin(t * Math.PI) * .65} transform={`translate(${x + ((i * 79) % width) + Math.sin(t * 5 + i) * 15} ${y + t * (210 + i % 4 * 45)}) rotate(${t * i * 13})`}>
      <path d="M-4 -2 L4 -3 L6 2 L-2 4Z" fill={i % 2 ? '#ad9776' : '#e4d2af'} stroke="#796c57" strokeWidth=".7" />
    </g>;
  });
}
function Tool({ kind, x, y, rotate = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotate})`} stroke="#253540" strokeWidth="3">
    {kind === 'wrench' ? <path d="M-12 -52 L-24 -69 L-17 -92 L-8 -69 L7 -69 L16 -92 L24 -69 L12 -52 L8 61 Q0 76 -8 61Z" fill="#acb8b9" /> : kind === 'driver' ? <><path d="M-3 -75 L3 -75 L3 14 L-3 14Z" fill="#c5d0ce" /><rect x="-10" y="14" width="20" height="52" rx="7" fill="#655641" /></> : <><path d="M-6 -20 H6 V23 H-6Z" fill="#aab7b9" /><path d="M-12 -20 L-7 -29 H7 L12 -20 L7 -12 H-7Z" fill="#d1d5cf" /><path d="M-6 0 H6 M-6 7 H6 M-6 14 H6" /></>}
  </g>;
}

// Coordinates belong to the corresponding master canvas. SVG layers share that
// canvas with the raster; zooming, rotation and text sizing cannot separate them.
export function MotionDrawing({ image, progress: p, uid }) {
  const { type, base, sprite } = image.motion;
  const w = image.width, h = image.height;
  const asset = src => <image href={src} width={w} height={h} />;
  let drawing;
  if (type === 'eyes-intro' || type === 'eyes-shutdown') {
    const color = eyeColor(p, type === 'eyes-shutdown');
    drawing = [525, 1005].map(x => <g key={x}><circle cx={x} cy="469" r="40" fill={color} opacity=".84" />{color !== '#101b2d' && <Glow x={x} y={469} r={75} color={color} opacity={.75} />}<circle cx={x + 19} cy="449" r="8" fill="#edf2ea" opacity=".7" /></g>);
  } else if (type === 'blade' || type === 'charge') {
    const t = ease(phase(p, .1, .7));
    drawing = <>
      <Glow x={620} y={490} r={125} opacity={t} />
      {type === 'blade' ? <g opacity={t} clipPath={`url(#${uid}-blade)`}>{asset(image.src)}</g> : <>
        <Glow x={595} y={770} r={300} color="#e0f8ff" opacity={t * .65} />
        <path d="M570 560 L530 644 L573 650 L512 748 L558 773 L514 880 L553 905 L501 1020 L530 1050 L490 1200" fill="none" stroke="#ddf6ff" strokeWidth={3 + t * 3} opacity={t} />
        <path d="M620 680 L667 737 L632 814 L655 882 L605 990 L631 1067" fill="none" stroke="#67cfff" strokeWidth="5" opacity={t} />
      </>}
    </>;
  } else if (type === 'ceiling-dust' || type === 'rubble') {
    drawing = <Dust p={p} x={type === 'rubble' ? 725 : 590} y={type === 'rubble' ? 150 : 255} width={type === 'rubble' ? 310 : 370} />;
  } else if (type === 'shield') {
    const t = ease(phase(p, .35, .95));
    drawing = <>
      <defs><clipPath id={`${uid}-tape`}><path d="M677 632 L753 640 L817 803 L711 817 L686 744Z" /></clipPath></defs>
      <g transform={`translate(${t * 45} ${t * 230}) rotate(${t * 27} 730 650)`} opacity={1 - phase(p, .8, 1)} clipPath={`url(#${uid}-tape)`}>{asset(image.src)}</g>
      {[455, 520, 587].map(y => <g key={y}><circle cx="778" cy={y} r="17" fill="#122132" opacity={phase(p, .25, .55)} /><Glow x={778} y={y} r={50} opacity={(1 - phase(p, .15, .5)) * .9} /></g>)}
    </>;
  } else if (type === 'magnet') {
    drawing = [['wrench', 240, 345, 22], ['driver', 340, 340, 32], ['bolt', 260, 570, 75], ['bolt', 218, 526, 35], ['bolt', 288, 550, 90]].map(([kind, x, y, angle], i) => {
      const t = ease(phase(p, .05 + i * .1, .4 + i * .1));
      return <Tool key={i} kind={kind} x={x + (1 - t) * 490} y={y - (1 - t) * 60} rotate={angle + (1 - t) * 40} />;
    });
  } else if (type === 'stars') {
    drawing = <g clipPath={`url(#${uid}-window)`}><g transform={`translate(${p * 12} ${p * 4})`}>{asset(image.src)}</g>{Array.from({ length: 28 }, (_, i) => <circle key={i} cx={340 + i * 101 % 850 + p * 14} cy={230 + i * 67 % 350 + p * 5} r={i % 4 === 0 ? 2.5 : 1.3} fill="#f6eee0" opacity={.3 + .2 * Math.sin(p * Math.PI * 2 + i)} />)}</g>;
  } else if (type === 'core') {
    drawing = [325, 497, 673].map(y => <Glow key={y} x={658} y={y} r={96} opacity={.3 + .45 * Math.sin(p * Math.PI * 2) ** 2} />);
  } else if (type === 'ice') {
    const t = ease(phase(p, .1, .95));
    drawing = <g clipPath={`url(#${uid}-screen)`} fill="none" stroke="#0b1e29" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
      {['M420 610 L495 574 L507 505 L578 480 L625 392 L711 409 L795 330 L895 348 L1020 270', 'M507 505 L464 455 L476 385', 'M711 409 L727 513 L804 553 L832 627', 'M895 348 L941 436 L1047 477'].map((d, i) => <path key={d} d={d} pathLength="1" strokeDasharray="1" strokeDashoffset={1 - phase(t, i * .15, .55 + i * .15)} />)}
    </g>;
  } else if (type === 'crystals') {
    drawing = [[403, 514, '#e8b9ff'], [555, 492, gold], [728, 478, blue], [921, 454, '#8ee9bc'], [1130, 445, '#ffb8b5']].map(([x, y, color], i) => <Glow key={x} x={x} y={y} r={60} color={color} opacity={.25 + .45 * Math.sin(p * Math.PI * 1.4 + i) ** 2} />);
  } else if (type === 'transfer') {
    const count = transferCount(p);
    drawing = Array.from({ length: count }, (_, i) => <Glow key={i} x={315 + i % 4 * 251} y={300 + Math.floor(i / 4) * 162} r={47} opacity={.8} />);
  } else if (type === 'beam') {
    const beam = phase(p, .1, .35), reaction = ease(phase(p, .63, 1));
    drawing = <>
      <g opacity={1 - reaction}><path d="M617 466 L999 549" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - beam} stroke="#b3dcff" strokeWidth="10" opacity=".4" /><path d="M617 466 L999 549" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - beam} stroke="#fffdf0" strokeWidth="3" /><Glow x={998} y={549} color="#fff7df" r={50} opacity={beam * .65} /></g>
      <g opacity={reaction}>{asset(image.src)}</g>
    </>;
  } else if (type === 'candles') {
    drawing = [[416, 404], [778, 335], [1127, 416]].map(([x, y], i) => { const t = ease(phase(p, .1 + i * .17, .28 + i * .17)); return <g key={x} opacity={t} transform={`translate(0 ${y - 443})`}><Glow x={x} y={409} color={gold} r={93} opacity={.7} /><path d={`M${x} 443 Q${x - 20} 426 ${x} 394 Q${x + 17} 427 ${x} 443Z`} fill="#ffbc42" /><path d={`M${x} 441 Q${x - 8} 430 ${x} 417 Q${x + 8} 432 ${x} 441Z`} fill="#fff5c0" /></g>; });
  } else if (type === 'globes') {
    const t = ease(phase(p, .2, .5));
    drawing = <><Glow x={373} y={410} r={100} color={gold} opacity={.3 + (1 - p) * .15 * Math.sin(p * 10) ** 2} /><Glow x={1164} y={410} r={135} color={gold} opacity={t * (1 - phase(p, .55, .85) * .35)} /></>;
  } else if (type === 'syphon') {
    const t = ease(phase(p, .1, .85));
    drawing = <>
      <g opacity={t}>{asset(base)}</g>
      <path d="M682 471 Q810 545 1025 428" pathLength="1" stroke={gold} strokeWidth="5" strokeDasharray=".025 .11" strokeDashoffset={-t} fill="none" opacity={Math.sin(t * Math.PI) * .85} />
      <Glow x={1035} y={434} r={135} color={gold} opacity={Math.sin(t * Math.PI) * .6} />
    </>;
  } else if (type === 'honey') {
    const t = ease(phase(p, .08, .85));
    const settle = ease(phase(p, .85, 1));
    const x = (1000 - Math.cos(t * Math.PI * 2) * 240) * (1 - settle) + 850 * settle;
    const y = (400 + Math.sin(t * Math.PI * 2) * 170) * (1 - settle) + 280 * settle;
    drawing = <>
      <Glow x={x - 115} y={y - 15} r={28} color={gold} opacity={1 - phase(p, .7, .82)} />
      <image href={sprite} x={x - 175} y={y - 175} width="350" height="350" />
    </>;
  } else if (type === 'circle') {
    drawing = <>
      {[0, 1, 2, 3, 4].map(i => { const t = ease(phase(p, i * .12, .35 + i * .12)); return <ellipse key={i} cx="798" cy="540" rx={(405 - i * 72) * (1 - t)} ry={(208 - i * 38) * (1 - t)} fill="none" stroke={gold} strokeWidth="4" opacity={1 - t} />; })}
      <Glow x={798} y={540} r={30} color={gold} opacity={phase(p, .68, .8) * (1 - phase(p, .88, 1))} />
    </>;
  }
  return <>
    <defs>
      <clipPath id={`${uid}-blade`}><rect x={500 * (1 - ease(phase(p, .1, .7)))} y="0" width="1024" height="1536" /></clipPath>
      <clipPath id={`${uid}-window`}><ellipse cx="768" cy="484" rx="605" ry="299" /></clipPath>
      <clipPath id={`${uid}-screen`}><rect x="330" y="205" width="875" height="520" rx="30" /></clipPath>
      <mask id={`${uid}-no-tape`}><rect width={w} height={h} fill="white" /><path d="M677 632 L753 640 L817 803 L711 817 L686 744Z" fill="black" /></mask>
    </defs>
    <g mask={type === 'shield' ? `url(#${uid}-no-tape)` : undefined} style={type === 'transfer' ? { filter: `brightness(${1 - ease(phase(p, 0, .3)) * .25})` } : undefined}>{asset(type === 'syphon' ? image.src : (base || image.src))}</g>
    {drawing}
  </>;
}
