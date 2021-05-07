// Muaz Khan     - https://github.com/muaz-khan
// neizerth      - https://github.com/neizerth
// MIT License   - https://www.webrtc-experiment.com/licence/
// Documentation - https://github.com/streamproc/MediaStreamRecorder
// ==========================================================
// gif-encoder.js

// ==========================================================

// Note:
// ==========================================================
// All libraries listed in this file are "external libraries"
// and has their own copyrights. Taken from "jsGif" project.

/**
 * This class handles LZW encoding
 * Adapted from Jef Poskanzer's Java port by way of J. M. G. Elliott.
 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
 * @author Thibault Imbert (AS3 version - bytearray.org)
 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
 * @author Guilherme Siquinelli (TypeScript version - https://github.com/guiseek/seek)
 * @version 0.1 AS3 implementation
 */

class LZWEncoder {
  exports = {}
  EOF = -1
  imgW: number
  imgH: number
  pixAry: any[]
  initCodeSize: number
  remaining: number
  curPixel: number

  // GIFCOMPR.C - GIF Image compression routines
  // Lempel-Ziv compression based on 'compress'. GIF modifications by
  // David Rowley (mgardi@watdcsu.waterloo.edu)
  // General DEFINEs

  BITS = 12
  HSIZE = 5003 // 80% occupancy

  // GIF Image compression - modified 'compress'
  // Based on: compress.c - File compression ala IEEE Computer, June 1984.
  // By Authors: Spencer W. Thomas (decvax!harpo!utah-cs!utah-gr!thomas)
  // Jim McKie (decvax!mcvax!jim)
  // Steve Davies (decvax!vax135!petsd!peora!srd)
  // Ken Turkowski (decvax!decwrl!turtlevax!ken)
  // James A. Woods (decvax!ihnp4!ames!jaw)
  // Joe Orost (decvax!vax135!petsd!joe)

  n_bits: number // number of bits/code
  maxbits = this.BITS // user settable max # bits/code
  maxcode: number // maximum code, given n_bits
  maxmaxcode = 1 << this.BITS // should NEVER generate this code
  htab = []
  codetab = []
  hsize = this.HSIZE // for dynamic table sizing
  free_ent = 0 // first unused entry

  // block compression parameters -- after all codes are used up,
  // and compression rate changes, start over.

  clear_flg = false

  // Algorithm: use open addressing double hashing (no chaining) on the
  // prefix code / next character combination. We do a letiant of Knuth's
  // algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime
  // secondary probe. Here, the modular division first probe is gives way
  // to a faster exclusive-or manipulation. Also do block compression with
  // an adaptive reset, whereby the code table is cleared when the compression
  // ratio decreases, but after the table fills. The letiable-length output
  // codes are re-sized at this point, and a special CLEAR code is generated
  // for the decompressor. Late addition: construct the table according to
  // file size for noticeable speed improvement on small files. Please direct
  // questions about this implementation to ames!jaw.

  g_init_bits: any
  ClearCode: number
  EOFCode: any

  // output
  // Output the given code.
  // Inputs:
  // code: A n_bits-bit integer. If == -1, then EOF. This assumes
  // that n_bits =< wordsize - 1.
  // Outputs:
  // Outputs code to the file.
  // Assumptions:
  // Chars are 8 bits long.
  // Algorithm:
  // Maintain a BITS character long buffer (so that 8 codes will
  // fit in it exactly). Use the VAX insv instruction to insert each
  // code in turn. When the buffer fills up empty it and start over.

  cur_accum = 0
  cur_bits = 0
  masks = [
    0x0000,
    0x0001,
    0x0003,
    0x0007,
    0x000f,
    0x001f,
    0x003f,
    0x007f,
    0x00ff,
    0x01ff,
    0x03ff,
    0x07ff,
    0x0fff,
    0x1fff,
    0x3fff,
    0x7fff,
    0xffff,
  ]

  // Number of characters so far in this 'packet'
  a_count: number

  // Define the storage for the packet accumulator
  accum = []

  constructor(width: number, height: number, pixels: any, color_depth: number) {
    this.imgW = width
    this.imgH = height
    this.pixAry = pixels
    this.initCodeSize = Math.max(2, color_depth)
  }

  // Add a character to the end of the current packet, and if it is 254
  // characters, flush the packet to disk.
  char_out(c: number, outs: any) {
    this.accum[this.a_count++] = c
    if (this.a_count >= 254) this.flush_char(outs)
  }

  // Clear out the hash table
  // table clear for block compress

  cl_block(outs: any) {
    this.cl_hash(this.hsize)
    this.free_ent = this.ClearCode + 2
    this.clear_flg = true
    this.output(this.ClearCode, outs)
  }

  // reset code table
  cl_hash(hsize: number) {
    for (let i = 0; i < hsize; ++i) this.htab[i] = -1
  }

  compress(init_bits: number, outs: any) {
    let fcode: number
    let i: number /* = 0 */
    let c: number
    let ent: number
    let disp: number
    let hsize_reg: number
    let hshift: number

    // Set up the globals: g_init_bits - initial number of bits
    this.g_init_bits = init_bits

    // Set up the necessary values
    this.clear_flg = false
    this.n_bits = this.g_init_bits
    this.maxcode = this.MAXCODE(this.n_bits)

    this.ClearCode = 1 << (init_bits - 1)
    this.EOFCode = this.ClearCode + 1
    this.free_ent = this.ClearCode + 2

    this.a_count = 0 // clear packet

    ent = this.nextPixel()

    hshift = 0
    for (fcode = this.hsize; fcode < 65536; fcode *= 2) ++hshift
    hshift = 8 - hshift // set hash code range bound

    hsize_reg = this.hsize
    this.cl_hash(hsize_reg) // clear hash table

    this.output(this.ClearCode, outs)

    outer_loop: while ((c = this.nextPixel()) != this.EOF) {
      fcode = (c << this.maxbits) + ent
      i = (c << hshift) ^ ent // xor hashing

      if (this.htab[i] == fcode) {
        ent = this.codetab[i]
        continue
      } else if (this.htab[i] >= 0) {
        // non-empty slot

        disp = hsize_reg - i // secondary hash (after G. Knott)
        if (i === 0) disp = 1

        do {
          if ((i -= disp) < 0) i += hsize_reg

          if (this.htab[i] == fcode) {
            ent = this.codetab[i]
            continue outer_loop
          }
        } while (this.htab[i] >= 0)
      }

      this.output(ent, outs)
      ent = c
      if (this.free_ent < this.maxmaxcode) {
        this.codetab[i] = this.free_ent++ // code -> hashtable
        this.htab[i] = fcode
      } else this.cl_block(outs)
    }

    // Put out the final code.
    this.output(ent, outs)
    this.output(this.EOFCode, outs)
  }

  // ----------------------------------------------------------------------------
  encode(os: { writeByte: (arg0: number) => void }) {
    os.writeByte(this.initCodeSize) // write "initial code size" byte
    this.remaining = this.imgW * this.imgH // reset navigation letiables
    this.curPixel = 0
    this.compress(this.initCodeSize + 1, os) // compress and write the pixel data
    os.writeByte(0) // write block terminator
  }

  // Flush the packet to disk, and reset the accumulator
  flush_char(outs: {
    writeByte: (arg0: any) => void
    writeBytes: (arg0: any[], arg1: number, arg2: any) => void
  }) {
    if (this.a_count > 0) {
      outs.writeByte(this.a_count)
      outs.writeBytes(this.accum, 0, this.a_count)
      this.a_count = 0
    }
  }

  MAXCODE(n_bits: number) {
    return (1 << n_bits) - 1
  }

  // ----------------------------------------------------------------------------
  // Return the next pixel from the image
  // ----------------------------------------------------------------------------

  nextPixel() {
    if (this.remaining === 0) return this.EOF
    --this.remaining
    let pix = this.pixAry[this.curPixel++]
    return pix & 0xff
  }

  output(code: number, outs: any) {
    this.cur_accum &= this.masks[this.cur_bits]

    if (this.cur_bits > 0) this.cur_accum |= code << this.cur_bits
    else this.cur_accum = code

    this.cur_bits += this.n_bits

    while (this.cur_bits >= 8) {
      this.char_out(this.cur_accum & 0xff, outs)
      this.cur_accum >>= 8
      this.cur_bits -= 8
    }

    // If the next entry is going to be too big for the code size,
    // then increase it, if possible.

    if (this.free_ent > this.maxcode || this.clear_flg) {
      if (this.clear_flg) {
        this.maxcode = this.MAXCODE((this.n_bits = this.g_init_bits))
        this.clear_flg = false
      } else {
        ++this.n_bits
        if (this.n_bits == this.maxbits) this.maxcode = this.maxmaxcode
        else this.maxcode = this.MAXCODE(this.n_bits)
      }
    }

    if (code == this.EOFCode) {
      // At EOF, write the rest of the buffer.
      while (this.cur_bits > 0) {
        this.char_out(this.cur_accum & 0xff, outs)
        this.cur_accum >>= 8
        this.cur_bits -= 8
      }

      this.flush_char(outs)
    }
  }

  // LZWEncoder.apply(this, arguments);
  // return exports;
}

/**
 * NeuQuant Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
 * "Kohonen neural networks for optimal colour quantization" in "Network:
 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
 * the algorithm.
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
 * this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons who
 * receive copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 **/

/**
 * This class handles Neural-Net quantization algorithm
 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
 * @author Thibault Imbert (AS3 version - bytearray.org)
 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
 * @author Guilherme Siquinelli (TypeScript version - https://github.com/guiseek/seek)
 * @version 0.1 AS3 implementation
 */

class NeuQuant {
  exports = {}
  netsize = 256 /* number of colours used */

  /* four primes near 500 - assume no image has a length so large */
  /* that it is divisible by all four primes */

  prime1 = 499
  prime2 = 491
  prime3 = 487
  prime4 = 503
  minpicturebytes = 3 * this.prime4 /* minimum size for input image */

  /*
   * Program Skeleton ---------------- [select samplefac in range 1..30] [read
   * image from input file] pic = (unsigned char*) malloc(3*width*height);
   * initnet(pic,3*width*height,samplefac); learn(); unbiasnet(); [write output
   * image header, using writecolourmap(f)] inxbuild(); write output image using
   * inxsearch(b,g,r)
   */

  /*
   * Network Definitions -------------------
   */

  maxnetpos = this.netsize - 1
  netbiasshift = 4 /* bias for colour values */
  ncycles = 100 /* no. of learning cycles */

  /* defs for freq and bias */
  intbiasshift = 16 /* bias for fractions */
  intbias = 1 << this.intbiasshift
  gammashift = 10 /* gamma = 1024 */
  gamma = 1 << this.gammashift
  betashift = 10
  beta = this.intbias >> this.betashift /* beta = 1/1024 */
  betagamma = this.intbias << (this.gammashift - this.betashift)

  /* defs for decreasing radius factor */
  initrad = this.netsize >> 3 /* for 256 cols, radius starts */
  radiusbiasshift = 6 /* at 32.0 biased by 6 bits */
  radiusbias = 1 << this.radiusbiasshift
  initradius = this.initrad * this.radiusbias /* and decreases by a */
  radiusdec = 30 /* factor of 1/30 each cycle */

  /* defs for decreasing alpha factor */
  alphabiasshift = 10 /* alpha starts at 1.0 */
  initalpha = 1 << this.alphabiasshift
  alphadec: number /* biased by 10 bits */

  /* radbias and alpharadbias used for radpower calculation */
  radbiasshift = 8
  radbias = 1 << this.radbiasshift
  alpharadbshift = this.alphabiasshift + this.radbiasshift
  alpharadbias = 1 << this.alpharadbshift

  /*
   * Types and Global Variables --------------------------
   */

  thepicture: any /* the input image itself */
  lengthcount: number /* lengthcount = H*W*3 */
  samplefac: number /* sampling factor 1..30 */

  // typedef int pixel[4]; /* BGRc */
  network: any[] /* the network itself - [netsize][4] */
  netindex = []

  /* for network lookup - really 256 */
  bias = []

  /* bias and freq arrays for learning */
  freq = []
  radpower = []

  constructor(thepic: any, len: any, sample: number) {
    let i: number
    let p: number[]

    this.thepicture = thepic
    this.lengthcount = len
    this.samplefac = sample

    this.network = new Array(this.netsize)

    for (i = 0; i < this.netsize; i++) {
      this.network[i] = new Array(4)
      p = this.network[i]
      p[0] = p[1] = p[2] = (i << (this.netbiasshift + 8)) / this.netsize
      this.freq[i] = this.intbias / this.netsize /* 1/netsize */
      this.bias[i] = 0
    }
  }

  colorMap() {
    let map = []
    let index = new Array(this.netsize)

    for (let i = 0; i < this.netsize; i++) index[this.network[i][3]] = i

    let k = 0
    for (let l = 0; l < this.netsize; l++) {
      let j = index[l]
      map[k++] = this.network[j][0]
      map[k++] = this.network[j][1]
      map[k++] = this.network[j][2]
    }

    return map
  }

  /*
   * Insertion sort of network and building of netindex[0..255] (to do after
   * unbias)
   * -------------------------------------------------------------------------------
   */

  inxbuild() {
    let i: number
    let j: number
    let smallpos: string | number
    let smallval: number
    let p: any[]
    let q: any[]
    let previouscol: number
    let startpos: number

    previouscol = 0
    startpos = 0
    for (i = 0; i < this.netsize; i++) {
      p = this.network[i]
      smallpos = i
      smallval = p[1] /* index on g */

      /* find smallest in i..netsize-1 */
      for (j = i + 1; j < this.netsize; j++) {
        q = this.network[j]
        if (q[1] < smallval) {
          /* index on g */
          smallpos = j
          smallval = q[1] /* index on g */
        }
      }
      q = this.network[smallpos]

      /* swap p (i) and q (smallpos) entries */
      if (i != smallpos) {
        j = q[0]
        q[0] = p[0]
        p[0] = j
        j = q[1]
        q[1] = p[1]
        p[1] = j
        j = q[2]
        q[2] = p[2]
        p[2] = j
        j = q[3]
        q[3] = p[3]
        p[3] = j
      }

      /* smallval entry is now in position i */

      if (smallval != previouscol) {
        this.netindex[previouscol] = (startpos + i) >> 1

        for (j = previouscol + 1; j < smallval; j++) this.netindex[j] = i

        previouscol = smallval
        startpos = i
      }
    }

    this.netindex[previouscol] = (startpos + this.maxnetpos) >> 1
    for (j = previouscol + 1; j < 256; j++)
      this.netindex[j] = this.maxnetpos /* really 256 */
  }

  /*
   * Main Learning Loop ------------------
   */

  learn() {
    let i: number
    let j: number
    let b: number
    let g: number
    let r: number
    let radius: number
    let rad: number
    let alpha: number
    let step: number
    let delta: number
    let samplepixels: number
    let p: { [x: string]: number }
    let pix: number
    let lim: number

    if (this.lengthcount < this.minpicturebytes) this.samplefac = 1

    this.alphadec = 30 + (this.samplefac - 1) / 3
    p = this.thepicture
    pix = 0
    lim = this.lengthcount
    samplepixels = this.lengthcount / (3 * this.samplefac)
    delta = (samplepixels / this.ncycles) | 0
    alpha = this.initalpha
    radius = this.initradius

    rad = radius >> this.radiusbiasshift
    if (rad <= 1) rad = 0

    for (i = 0; i < rad; i++)
      this.radpower[i] =
        alpha * (((rad * rad - i * i) * this.radbias) / (rad * rad))

    if (this.lengthcount < this.minpicturebytes) step = 3
    else if (this.lengthcount % this.prime1 !== 0) step = 3 * this.prime1
    else {
      if (this.lengthcount % this.prime2 !== 0) step = 3 * this.prime2
      else {
        if (this.lengthcount % this.prime3 !== 0) step = 3 * this.prime3
        else step = 3 * this.prime4
      }
    }

    i = 0
    while (i < samplepixels) {
      b = (p[pix + 0] & 0xff) << this.netbiasshift
      g = (p[pix + 1] & 0xff) << this.netbiasshift
      r = (p[pix + 2] & 0xff) << this.netbiasshift
      j = this.contest(b, g, r)

      this.altersingle(alpha, j, b, g, r)
      if (rad !== 0) this.alterneigh(rad, j, b, g, r) /* alter neighbours */

      pix += step
      if (pix >= lim) pix -= this.lengthcount

      i++

      if (delta === 0) delta = 1

      if (i % delta === 0) {
        alpha -= alpha / this.alphadec
        radius -= radius / this.radiusdec
        rad = radius >> this.radiusbiasshift

        if (rad <= 1) rad = 0

        for (j = 0; j < rad; j++)
          this.radpower[j] =
            alpha * (((rad * rad - j * j) * this.radbias) / (rad * rad))
      }
    }
  }

  /*
   ** Search for BGR values 0..255 (after net is unbiased) and return colour
   * index
   * ----------------------------------------------------------------------------
   */

  map(b: number, g: number, r: number) {
    let i: number
    let j: number
    let dist: number
    let a: number
    let bestd: number
    let p: any[]
    let best: number

    bestd = 1000 /* biggest possible dist is 256*3 */
    best = -1
    i = this.netindex[g] /* index on g */
    j = i - 1 /* start at netindex[g] and work outwards */

    while (i < this.netsize || j >= 0) {
      if (i < this.netsize) {
        p = this.network[i]
        dist = p[1] - g /* inx key */

        if (dist >= bestd) i = this.netsize
        /* stop iter */ else {
          i++
          if (dist < 0) dist = -dist
          a = p[0] - b
          if (a < 0) a = -a
          dist += a

          if (dist < bestd) {
            a = p[2] - r
            if (a < 0) a = -a
            dist += a

            if (dist < bestd) {
              bestd = dist
              best = p[3]
            }
          }
        }
      }

      if (j >= 0) {
        p = this.network[j]
        dist = g - p[1] /* inx key - reverse dif */

        if (dist >= bestd) j = -1
        /* stop iter */ else {
          j--
          if (dist < 0) dist = -dist
          a = p[0] - b
          if (a < 0) a = -a
          dist += a

          if (dist < bestd) {
            a = p[2] - r
            if (a < 0) a = -a
            dist += a
            if (dist < bestd) {
              bestd = dist
              best = p[3]
            }
          }
        }
      }
    }

    return best
  }

  process() {
    this.learn()
    this.unbiasnet()
    this.inxbuild()
    return this.colorMap()
  }

  /*
   * Unbias network to give byte values 0..255 and record position i to prepare
   * for sort
   * -----------------------------------------------------------------------------------
   */

  unbiasnet() {
    let i: number
    let j: any

    for (i = 0; i < this.netsize; i++) {
      this.network[i][0] >>= this.netbiasshift
      this.network[i][1] >>= this.netbiasshift
      this.network[i][2] >>= this.netbiasshift
      this.network[i][3] = i /* record colour no */
    }
  }

  /*
   * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in
   * radpower[|i-j|]
   * ---------------------------------------------------------------------------------
   */

  alterneigh(rad: number, i: number, b: number, g: number, r: number) {
    let j: number
    let k: number
    let lo: number
    let hi: number
    let a: number
    let m: number
    let p: number[]

    lo = i - rad
    if (lo < -1) lo = -1

    hi = i + rad
    if (hi > this.netsize) hi = this.netsize

    j = i + 1
    k = i - 1
    m = 1

    while (j < hi || k > lo) {
      a = this.radpower[m++]

      if (j < hi) {
        p = this.network[j++]

        try {
          p[0] -= (a * (p[0] - b)) / this.alpharadbias
          p[1] -= (a * (p[1] - g)) / this.alpharadbias
          p[2] -= (a * (p[2] - r)) / this.alpharadbias
        } catch (e) {} // prevents 1.3 miscompilation
      }

      if (k > lo) {
        p = this.network[k--]

        try {
          p[0] -= (a * (p[0] - b)) / this.alpharadbias
          p[1] -= (a * (p[1] - g)) / this.alpharadbias
          p[2] -= (a * (p[2] - r)) / this.alpharadbias
        } catch (e) {}
      }
    }
  }

  /*
   * Move neuron i towards biased (b,g,r) by factor alpha
   * ----------------------------------------------------
   */

  altersingle(
    alpha: number,
    i: string | number,
    b: number,
    g: number,
    r: number
  ) {
    /* alter hit neuron */
    let n = this.network[i]
    n[0] -= (alpha * (n[0] - b)) / this.initalpha
    n[1] -= (alpha * (n[1] - g)) / this.initalpha
    n[2] -= (alpha * (n[2] - r)) / this.initalpha
  }

  /*
   * Search for biased BGR values ----------------------------
   */

  contest(b: number, g: number, r: number) {
    /* finds closest neuron (min dist) and updates freq */
    /* finds best neuron (min dist-bias) and returns position */
    /* for frequently chosen neurons, freq[i] is high and bias[i] is negative */
    /* bias[i] = gamma*((1/netsize)-freq[i]) */

    let i: number
    let dist: number
    let a: number
    let biasdist: number
    let betafreq: number
    let bestpos: number
    let bestbiaspos: any
    let bestd: number
    let bestbiasd: number
    let n: number[]

    bestd = ~(1 << 31)
    bestbiasd = bestd
    bestpos = -1
    bestbiaspos = bestpos

    for (i = 0; i < this.netsize; i++) {
      n = this.network[i]
      dist = n[0] - b
      if (dist < 0) dist = -dist
      a = n[1] - g
      if (a < 0) a = -a
      dist += a
      a = n[2] - r
      if (a < 0) a = -a
      dist += a

      if (dist < bestd) {
        bestd = dist
        bestpos = i
      }

      biasdist =
        dist - (this.bias[i] >> (this.intbiasshift - this.netbiasshift))

      if (biasdist < bestbiasd) {
        bestbiasd = biasdist
        bestbiaspos = i
      }

      betafreq = this.freq[i] >> this.betashift
      this.freq[i] -= betafreq
      this.bias[i] += betafreq << this.gammashift
    }

    this.freq[bestpos] += this.beta
    this.bias[bestpos] -= this.betagamma
    return bestbiaspos
  }
}

/**
 * This class lets you encode animated GIF files
 * Base class :  http://www.java2s.com/Code/Java/2D-Graphics-GUI/AnimatedGifEncoder.htm
 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
 * @author Thibault Imbert (AS3 version - bytearray.org)
 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
 * @version 0.1 AS3 implementation
 * @author Guilherme Siquinelli (TypeScript version - https://github.com/guiseek/seek)
 */

let chr: Record<string, any>

export const GIFEncoder = function () {
  for (let i = 0, chr = {}; i < 256; i++) chr[i] = String.fromCharCode(i)

  function ByteArray() {
    this.bin = []
  }

  ByteArray.prototype.getData = function () {
    let v: any
    for (let v = '', l = this.bin.length, i = 0; i < l; i++)
      v += chr[this.bin[i]]
    return v
  }

  ByteArray.prototype.writeByte = function (val: any) {
    this.bin.push(val)
  }

  ByteArray.prototype.writeUTFBytes = function (string: string) {
    for (let l = string.length, i = 0; i < l; i++)
      this.writeByte(string.charCodeAt(i))
  }

  ByteArray.prototype.writeBytes = function (
    array: string | any[],
    offset: number,
    length: any
  ) {
    for (let l = length || array.length, i = offset || 0; i < l; i++)
      this.writeByte(array[i])
  }

  let exports = {}
  let width: number // image size
  let height: number
  let transparent = null // transparent color if given
  let transIndex: number // transparent index in color table
  let repeat = -1 // no repeat
  let delay = 0 // frame delay (hundredths)
  let started = false // ready to output frames
  let out: {
    writeByte: (arg0: number) => void
    writeUTFBytes: (arg0: string) => void
    writeBytes: (arg0: any) => void
  }
  let image: any // current frame
  let pixels: string | any[] // BGR byte array from frame
  let indexedPixels: any[] // converted frame indexed to palette
  let colorDepth: number // number of bit planes
  let colorTab: string | any[] // RGB palette
  let usedEntry = [] // active palette entries
  let palSize = 7 // color table size (bits-1)
  let dispose = -1 // disposal code (-1 = use default)
  let closeStream = false // close stream when finished
  let firstFrame = true
  let sizeSet = false // if false, get size from first frame
  let sample = 10 // default sample interval for quantizer
  let comment = 'Generated by jsgif (https://github.com/antimatter15/jsgif/)' // default comment for generated gif

  /**
   * Sets the delay time between each frame, or changes it for subsequent frames
   * (applies to last frame added)
   * int delay time in milliseconds
   * @param ms
   */

  let setDelay = function setDelay(ms: number) {
    delay = Math.round(ms / 10)
  }

  /**
   * Sets the GIF frame disposal code for the last added frame and any
   *
   * subsequent frames. Default is 0 if no transparent color has been set,
   * otherwise 2.
   * @param code
   * int disposal code.
   */

  let setDispose = function setDispose(code: number) {
    if (code >= 0) dispose = code
  }

  /**
   * Sets the number of times the set of GIF frames should be played. Default is
   * 1; 0 means play indefinitely. Must be invoked before the first image is
   * added.
   *
   * @param iter
   * int number of iterations.
   * @return
   */

  let setRepeat = function setRepeat(iter: number) {
    if (iter >= 0) repeat = iter
  }

  /**
   * Sets the transparent color for the last added frame and any subsequent
   * frames. Since all colors are subject to modification in the quantization
   * process, the color in the final palette for each frame closest to the given
   * color becomes the transparent color for that frame. May be set to null to
   * indicate no transparent color.
   * @param
   * Color to be treated as transparent on display.
   */

  let setTransparent = function setTransparent(c: any) {
    transparent = c
  }

  /**
   * Sets the comment for the block comment
   * @param
   * string to be insterted as comment
   */

  let setComment = function setComment(c: string) {
    comment = c
  }

  /**
   * The addFrame method takes an incoming BitmapData object to create each frames
   * @param
   * BitmapData object to be treated as a GIF's frame
   */

  let addFrame = function addFrame(
    im: {
      getImageData: (
        arg0: number,
        arg1: number,
        arg2: any,
        arg3: any
      ) => { (): any; new (): any; data: any }
      canvas: { width: any; height: any }
    },
    is_imageData: any
  ) {
    if (im === null || !started || out === null) {
      throw new Error('Please call start method before calling addFrame')
    }

    let ok = true

    try {
      if (!is_imageData) {
        image = im.getImageData(0, 0, im.canvas.width, im.canvas.height).data
        if (!sizeSet) setSize(im.canvas.width, im.canvas.height)
      } else {
        image = im
      }
      getImagePixels() // convert to correct format if necessary
      analyzePixels() // build color table & map pixels

      if (firstFrame) {
        writeLSD() // logical screen descriptior
        writePalette() // global color table
        if (repeat >= 0) {
          // use NS app extension to indicate reps
          writeNetscapeExt()
        }
      }

      writeGraphicCtrlExt() // write graphic control extension
      if (comment !== '') {
        writeCommentExt() // write comment extension
      }
      writeImageDesc() // image descriptor
      if (!firstFrame) writePalette() // local color table
      writePixels() // encode and write pixel data
      firstFrame = false
    } catch (e) {
      ok = false
    }

    return ok
  }

  /**
   * Adds final trailer to the GIF stream, if you don't call the finish method
   * the GIF stream will not be valid.
   */

  let finish = function finish() {
    if (!started) return false

    let ok = true
    started = false

    try {
      out.writeByte(0x3b) // gif trailer
    } catch (e) {
      ok = false
    }

    return ok
  }

  /**
   * Resets some members so that a new stream can be started.
   * This method is actually called by the start method
   */

  let reset = function reset() {
    // reset for subsequent use
    transIndex = 0
    image = null
    pixels = null
    indexedPixels = null
    colorTab = null
    closeStream = false
    firstFrame = true
  }

  /**
   * * Sets frame rate in frames per second. Equivalent to
   * <code>setDelay(1000/fps)</code>.
   * @param fps
   * float frame rate (frames per second)
   */

  let setFrameRate = function setFrameRate(fps: number) {
    if (fps != 0xf) delay = Math.round(100 / fps)
  }

  /**
   * Sets quality of color quantization (conversion of images to the maximum 256
   * colors allowed by the GIF specification). Lower values (minimum = 1)
   * produce better colors, but slow processing significantly. 10 is the
   * default, and produces good color mapping at reasonable speeds. Values
   * greater than 20 do not yield significant improvements in speed.
   * @param quality
   * int greater than 0.
   * @return
   */

  let setQuality = function setQuality(quality: number) {
    if (quality < 1) quality = 1
    sample = quality
  }

  /**
   * Sets the GIF frame size. The default size is the size of the first frame
   * added if this method is not invoked.
   * @param w
   * int frame width.
   * @param h
   * int frame width.
   */

  let setSize = function setSize(w: any, h: any) {
    if (started && !firstFrame) return
    width = w
    height = h
    if (width < 1) width = 320
    if (height < 1) height = 240
    sizeSet = true
  }

  /**
   * Initiates GIF file creation on the given stream.
   * @param os
   * OutputStream on which GIF images are written.
   * @return false if initial write failed.
   */

  let start = function start() {
    reset()
    let ok = true
    closeStream = false
    out = new ByteArray()
    try {
      out.writeUTFBytes('GIF89a') // header
    } catch (e) {
      ok = false
    }

    return (started = ok)
  }

  let cont = function cont() {
    reset()
    let ok = true
    closeStream = false
    out = new ByteArray()

    return (started = ok)
  }

  /**
   * Analyzes image colors and creates color map.
   */

  let analyzePixels = function analyzePixels() {
    let len = pixels.length
    let nPix = len / 3
    indexedPixels = []
    let nq = new NeuQuant(pixels, len, sample)

    // initialize quantizer
    colorTab = nq.process() // create reduced palette

    // map image pixels to new palette
    let k = 0
    for (let j = 0; j < nPix; j++) {
      let index = nq.map(
        pixels[k++] & 0xff,
        pixels[k++] & 0xff,
        pixels[k++] & 0xff
      )
      usedEntry[index] = true
      indexedPixels[j] = index
    }

    pixels = null
    colorDepth = 8
    palSize = 7

    // get closest match to transparent color if specified
    if (transparent !== null) {
      transIndex = findClosest(transparent)
    }
  }

  /**
   * Returns index of palette color closest to c
   */

  let findClosest = function findClosest(c: number) {
    if (colorTab === null) return -1
    let r = (c & 0xff0000) >> 16
    let g = (c & 0x00ff00) >> 8
    let b = c & 0x0000ff
    let minpos = 0
    let dmin = 256 * 256 * 256
    let len = colorTab.length

    for (let i = 0; i < len; ) {
      let dr = r - (colorTab[i++] & 0xff)
      let dg = g - (colorTab[i++] & 0xff)
      let db = b - (colorTab[i] & 0xff)
      let d = dr * dr + dg * dg + db * db
      let index = i / 3
      if (usedEntry[index] && d < dmin) {
        dmin = d
        minpos = index
      }
      i++
    }
    return minpos
  }

  /**
   * Extracts image pixels into byte array "pixels
   */

  let getImagePixels = function getImagePixels() {
    let w = width
    let h = height
    pixels = []
    let data = image
    let count = 0

    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        let b = i * w * 4 + j * 4
        pixels[count++] = data[b]
        pixels[count++] = data[b + 1]
        pixels[count++] = data[b + 2]
      }
    }
  }

  /**
   * Writes Graphic Control Extension
   */

  let writeGraphicCtrlExt = function writeGraphicCtrlExt() {
    out.writeByte(0x21) // extension introducer
    out.writeByte(0xf9) // GCE label
    out.writeByte(4) // data block size
    let transp: number
    let disp: number
    if (transparent === null) {
      transp = 0
      disp = 0 // dispose = no action
    } else {
      transp = 1
      disp = 2 // force clear if using transparent color
    }
    if (dispose >= 0) {
      disp = dispose & 7 // user override
    }
    disp <<= 2
    // packed fields
    out.writeByte(
      0 | // 1:3 reserved
        disp | // 4:6 disposal
        0 | // 7 user input - 0 = none
        transp
    ) // 8 transparency flag

    WriteShort(delay) // delay x 1/100 sec
    out.writeByte(transIndex) // transparent color index
    out.writeByte(0) // block terminator
  }

  /**
   * Writes Comment Extention
   */

  let writeCommentExt = function writeCommentExt() {
    out.writeByte(0x21) // extension introducer
    out.writeByte(0xfe) // comment label
    out.writeByte(comment.length) // Block Size (s)
    out.writeUTFBytes(comment)
    out.writeByte(0) // block terminator
  }

  /**
   * Writes Image Descriptor
   */

  let writeImageDesc = function writeImageDesc() {
    out.writeByte(0x2c) // image separator
    WriteShort(0) // image position x,y = 0,0
    WriteShort(0)
    WriteShort(width) // image size
    WriteShort(height)

    // packed fields
    if (firstFrame) {
      // no LCT - GCT is used for first (or only) frame
      out.writeByte(0)
    } else {
      // specify normal LCT
      out.writeByte(
        0x80 | // 1 local color table 1=yes
          0 | // 2 interlace - 0=no
          0 | // 3 sorted - 0=no
          0 | // 4-5 reserved
          palSize
      ) // 6-8 size of color table
    }
  }

  /**
   * Writes Logical Screen Descriptor
   */

  let writeLSD = function writeLSD() {
    // logical screen size
    WriteShort(width)
    WriteShort(height)
    // packed fields
    out.writeByte(
      0x80 | // 1 : global color table flag = 1 (gct used)
        0x70 | // 2-4 : color resolution = 7
        0x00 | // 5 : gct sort flag = 0
        palSize
    ) // 6-8 : gct size

    out.writeByte(0) // background color index
    out.writeByte(0) // pixel aspect ratio - assume 1:1
  }

  /**
   * Writes Netscape application extension to define repeat count.
   */

  let writeNetscapeExt = function writeNetscapeExt() {
    out.writeByte(0x21) // extension introducer
    out.writeByte(0xff) // app extension label
    out.writeByte(11) // block size
    out.writeUTFBytes('NETSCAPE' + '2.0') // app id + auth code
    out.writeByte(3) // sub-block size
    out.writeByte(1) // loop sub-block id
    WriteShort(repeat) // loop count (extra iterations, 0=repeat forever)
    out.writeByte(0) // block terminator
  }

  /**
   * Writes color table
   */

  let writePalette = function writePalette() {
    out.writeBytes(colorTab)
    let n = 3 * 256 - colorTab.length
    for (let i = 0; i < n; i++) out.writeByte(0)
  }

  let WriteShort = function WriteShort(pValue: number) {
    out.writeByte(pValue & 0xff)
    out.writeByte((pValue >> 8) & 0xff)
  }

  /**
   * Encodes and writes pixel data
   */

  let writePixels = function writePixels() {
    let myencoder = new LZWEncoder(width, height, indexedPixels, colorDepth)
    myencoder.encode(out)
  }

  /**
   * Retrieves the GIF stream
   */

  let stream = function stream() {
    return out
  }

  let setProperties = function setProperties(
    has_start: boolean,
    is_first: boolean
  ) {
    started = has_start
    firstFrame = is_first
  }

  return exports
}
