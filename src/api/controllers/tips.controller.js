// energy and water conservation tips data
const tipsData = {
  energySavingTips: [
    "Switch to BEE 5-star rated appliances for better energy efficiency",
    "Use solar water heaters instead of electric geysers, especially common in Indian households",
    "Set your AC temperature to 24-26°C, ideal for Indian climate and energy saving",
    "Replace traditional light bulbs with LED bulbs approved by BIS (Bureau of Indian Standards)",
    "Use natural ventilation during early mornings and evenings, common in Indian weather",
    "Install solar panels on rooftops - government provides subsidies in many Indian states",
    "Service your desert coolers before summer season for optimal efficiency",
    "Use ISI marked electric appliances for better energy efficiency",
    "Cook with lids on vessels to reduce cooking time and energy consumption",
    "Use pressure cookers instead of regular pans for faster cooking and energy saving",
    "Avoid using stabilizers for new appliances as they consume additional power",
    "Run washing machines with full loads to save water and electricity",
    "Use exhaust fans judiciously, especially in Indian kitchens",
    "Install motion sensors for common area lighting in apartments",
    "Use inverters instead of generators during power cuts",
    "Plant trees around house to reduce AC usage - traditional Indian cooling method",
    "Use light-colored curtains to reflect heat in summer",
    "Regular maintenance of water pumps common in Indian buildings",
    "Use energy-efficient ceiling fans with 5-star ratings",
    "Implement time scheduling for water heaters using automatic timers",
  ],
  waterConservationTips: [
    "Install low-flow aerators in taps to reduce water flow by 50%",
    "Use bucket instead of shower - saves up to 80% water per bath",
    "Fix leaking taps immediately - one dripping tap wastes 20,000L annually",
    "Install dual-flush systems in toilets common in Indian apartments",
    "Collect RO waste water for plants and cleaning purposes",
    "Implement rainwater harvesting systems - mandatory in many Indian cities",
    "Use water meter to track consumption - helps identify wastage points",
    "Reuse water from washing vegetables for watering plants",
    "Run washing machine only with full loads to save 1000L per month",
    "Use flow reducers in bathroom fittings - saves 15L per minute",
    "Install water level controller for overhead tanks",
    "Use drip irrigation for gardens instead of flood irrigation",
    "Time your motor usage for filling overhead tanks",
    "Use mulching in gardens to reduce water evaporation",
    "Install water-efficient taps with ISI certification",
    "Use bucket and mug for car washing instead of hose",
    "Collect AC condensate water for non-drinking purposes",
    "Use water-saving attachments in wash basins and sinks",
    "Install automatic shut-off valves in common areas",
    "Regular maintenance of plumbing to prevent hidden leaks",
  ],
};

// Controller to send energy-saving tips
const getEnergySavingTips = (req, res) => {
  res.json({ energy_saving_tips: tipsData.energySavingTips });
};

// Controller to send water conservation tips
const getWaterConservationTips = (req, res) => {
  res.json({ water_conservation_tips: tipsData.waterConservationTips });
};

module.exports = {
  getEnergySavingTips,
  getWaterConservationTips,
};
