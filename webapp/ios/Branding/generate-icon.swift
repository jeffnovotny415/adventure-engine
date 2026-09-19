// Reproducible vector-drawn app icon. No story artwork is changed.
import AppKit
import ImageIO
import UniformTypeIdentifiers
let size = 1024
let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: size, pixelsHigh: size, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
func color(_ hex: Int) -> NSColor { NSColor(red: CGFloat((hex >> 16) & 255)/255, green: CGFloat((hex >> 8) & 255)/255, blue: CGFloat(hex & 255)/255, alpha: 1) }
func shape(_ points: [NSPoint], _ fill: Int) {
    let path = NSBezierPath(); path.move(to: points[0]); for p in points.dropFirst() { path.line(to:p) }; path.close(); color(fill).setFill(); path.fill()
}
color(0x42291F).setFill(); NSRect(x:0,y:0,width:1024,height:1024).fill()
let rim = NSBezierPath(roundedRect:NSRect(x:62,y:62,width:900,height:900),xRadius:48,yRadius:48)
color(0x987653).setStroke(); rim.lineWidth=5; rim.stroke()
let inner = NSBezierPath(roundedRect:NSRect(x:78,y:78,width:868,height:868),xRadius:38,yRadius:38)
color(0x69452F).setStroke(); inner.lineWidth=2; inner.stroke()
shape([.init(x:176,y:272),.init(x:474,y:232),.init(x:512,y:254),.init(x:550,y:232),.init(x:848,y:272),.init(x:848,y:692),.init(x:512,y:656),.init(x:176,y:692)],0xB58E5E)
shape([.init(x:198,y:299),.init(x:482,y:258),.init(x:504,y:275),.init(x:504,y:681),.init(x:478,y:699),.init(x:198,y:732)],0xEEE2C8)
shape([.init(x:520,y:275),.init(x:543,y:258),.init(x:826,y:299),.init(x:826,y:732),.init(x:546,y:699),.init(x:520,y:681)],0xE0CFAB)
color(0xB8A381).setStroke()
for n in 0..<4 {
 let p=NSBezierPath(); let y=CGFloat(358+n*53);p.move(to:.init(x:248,y:y));p.line(to:.init(x:457,y:y-27));p.lineWidth=6;p.stroke()
}
// A small, stamped compass star, rather than a glowing ornament.
shape([.init(x:673,y:598),.init(x:690,y:548),.init(x:741,y:530),.init(x:690,y:514),.init(x:673,y:463),.init(x:656,y:514),.init(x:605,y:530),.init(x:656,y:548)],0x806039)
shape([.init(x:711,y:315),.init(x:761,y:323),.init(x:761,y:440),.init(x:711,y:431)],0x733E32)
NSGraphicsContext.restoreGraphicsState()
let destination=CommandLine.arguments[1]
let rgb = CGContext(data: nil, width: size, height: size, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
rgb.draw(bitmap.cgImage!, in: CGRect(x: 0, y: 0, width: size, height: size))
let output = CGImageDestinationCreateWithURL(URL(fileURLWithPath: destination) as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(output, rgb.makeImage()!, nil)
precondition(CGImageDestinationFinalize(output))
