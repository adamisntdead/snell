/*
 *  let Theta_1 and Theta_2 be the angle taken by the light waves
 *  V_1, V_2 are the light velocities in the respective media
 *  n_1, n_)2 = indices of refraction in respective media.
 * 
 *  sin theta_1 / sin theta_2 = v_2 / v_2 = n_2 / n_1
 */

// Values for n for various surfaces
const refractiveIndices = {
  Vacuum: 1,
  // Air at 0 degrees
  'Air At 0 Degrees': 1.00029,
  Ice: 1.31,
  // Water at 20 deg
  'Water At 20 Degrees': 1.33,
  Pyrex: 1.47,
  'Plate Glass': 1.52,
  Sapphire: 1.762,
  Silicon: 3.42
}

/*
 * Going from the refractive index `from` to refractive index `to`,
 * at angle theta
 * 
 * Returns the other angle
 */
function calculateAngle(theta, from, to) {
  // to / from = sin theta / ans
  // => ans * (to / from) = sin theta
  // => ans = sin theta / (to / from)
  return Math.asin(Math.sin(theta) / (to / from))
}

module.exports = { calculateAngle, refractiveIndices }

// Light going from a vacuum into water at 45 degrees
console.log(
  calculateAngle(Math.PI / 4, refractiveIndices.vacuum, refractiveIndices.water)
)
