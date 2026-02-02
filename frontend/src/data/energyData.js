import solarImg from '../assets/solarpower.jpg';
import windImg from '../assets/wind.jpg';
import hydroImg from '../assets/hydro electric.jpg';
import coalImg from '../assets/coal.jpg';
import oilImg from '../assets/Oil.jpg';
import gasImg from '../assets/natural-gas.jpg';
import nuclearImg from '../assets/Nuclear_Energy.jpg';
import geothermalImg from '../assets/geothermal-plant.jpg';

// Fallback images
const fallbackImg = "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000";

const RICH_DATA = [
    {
        id: 'solar',
        type: 'Renewable',
        title: 'Solar Power',
        image: solarImg,
        desc: 'Harnessing sunlight for clean energy generation.',
        details: 'Solar power allows you to generate your own electricity using photovoltaic panels. It is clean, renewable, and helps reduce reliance on the grid.',
        rating: 5,
        efficiency: 22,
        impact: 10,
        pros: ['Infinite resource', 'No carbon emissions during operation', 'Low maintenance costs', 'Reduces electricity bills'],
        cons: ['Weather dependent', 'High initial cost', 'Space requirements', 'Energy storage is expensive'],
        examples: ['Rooftop Solar Panels', 'Solar Farms', 'Solar Calculators', 'Solar Water Heaters']
    },
    {
        id: 'wind',
        type: 'Renewable',
        title: 'Wind Energy',
        image: windImg,
        desc: 'Using wind turbines to capture kinetic energy.',
        details: 'Wind turbines convert the kinetic energy in the wind into mechanical power. This mechanical power can be used for specific tasks (such as grinding grain or pumping water) or a generator can convert this mechanical power into electricity.',
        rating: 4,
        efficiency: 45,
        impact: 15,
        pros: ['Zero emissions', 'Land can be used for farming below', 'Cost-effective', 'Sustainable'],
        cons: ['Noise pollution', 'Bird/Bat strikes', 'Visual impact', 'Wind is inconsistent'],
        examples: ['Offshore Wind Farms', 'Onshore Wind Turbines', 'Vertical Axis Turbines', 'Wind Mills']
    },
    {
        id: 'hydro',
        type: 'Renewable',
        title: 'Hydro Electric',
        image: hydroImg,
        desc: 'Generating power from flowing water sources.',
        details: 'Hydropower, or hydroelectric power, is one of the oldest and largest sources of renewable energy, which uses the natural flow of moving water to generate electricity.',
        rating: 4,
        efficiency: 90,
        impact: 40,
        pros: ['Reliable base load power', 'Flood control benefits', 'Recreational opportunities', 'Low operating costs'],
        cons: ['Displaces communities', 'Harms fish migration', 'Environmental impact of dams', 'Drought risk'],
        examples: ['Hoover Dam', 'Three Gorges Dam', 'Run-of-river plants', 'Pumped Storage']
    },
    {
        id: 'geothermal',
        type: 'Renewable',
        title: 'Geothermal',
        image: geothermalImg,
        desc: 'Utilizing heat from the earth\'s core.',
        details: 'Geothermal energy is heat within the earth. The word geothermal comes from the Greek words geo (earth) and therme (heat). Geothermal energy is a renewable energy source because heat is continuously produced inside the earth.',
        rating: 4,
        efficiency: 80, // High baseload
        impact: 20,
        pros: ['Reliable base load', 'Small land footprint', 'Scalable', 'No fuel cost'],
        cons: ['Location specific', 'High upfront cost', 'Risk of triggering earthquakes', 'Sulfur emissions'],
        examples: ['The Geysers (California)', 'Iceland Geothermal Plants', 'Hot Springs', 'Geothermal Heat Pumps']
    },
    {
        id: 'bioenergy',
        type: 'Renewable',
        title: 'Biomass Energy',
        image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80',
        desc: 'Organic waste used to generate heat or electricity.',
        details: 'Bioenergy is renewable energy produced from biomass, which is organic material such as trees, plants, and agricultural and urban waste.',
        rating: 3,
        efficiency: 50,
        impact: 50,
        pros: ['Reduces waste', 'Carbon neutral (theoretically)', 'Abundant fuel source', 'Can be used for fuels'],
        cons: ['Emits CO2 when burned', 'Deforestation risk', 'Water intensive', 'Lower energy density'],
        examples: ['Biogas plants', 'Wood pellet heating', 'Ethanol fuel', 'Agricultural waste burning']
    },
    {
        id: 'tidal',
        type: 'Renewable',
        title: 'Tidal Energy',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
        desc: 'Hydropower converted from tides.',
        details: 'Tidal energy is a form of hydropower that converts the energy obtained from tides into useful forms of power, mainly electricity.',
        rating: 3,
        efficiency: 80,
        impact: 30,
        pros: ['Predictable outputs', 'High energy density', 'Long lifespan', 'Effective at low speeds'],
        cons: ['High construction costs', 'Limited locations', 'Marine life impact', 'Corrosion issues'],
        examples: ['Sihwa Lake Tidal Power Station', 'La Rance Tidal Power Station', 'Tidal Barrages', 'Tidal Stream Generators']
    },
    {
        id: 'coal',
        type: 'Non-Renewable',
        title: 'Coal Energy',
        image: coalImg,
        desc: 'Fossil fuel energy from combusted coal.',
        details: 'Coal is a combustible black or brownish-black sedimentary rock with a high amount of carbon and hydrocarbons. Coal is classified as a nonrenewable energy source because it takes millions of years to form.',
        rating: 1,
        efficiency: 35,
        impact: 95,
        pros: ['Abundant supply', 'Inexpensive', 'Reliable technology', 'High load factor'],
        cons: ['High CO2 emissions', 'Acid rain (Sulfur)', 'Mining destruction', 'Non-renewable'],
        examples: ['Thermal Power Plants', 'Steel Production', 'Cement Manufacturing', 'Industrial Heating']
    },
    {
        id: 'oil',
        type: 'Non-Renewable',
        title: 'Oil (Petroleum)',
        image: oilImg,
        desc: 'Petroleum-based energy generation.',
        details: 'Crude oil is a liquid fuel fossil fuel that is burned in factories, power plants, and motor vehicles. Oil is a nonrenewable energy source that takes millions of years to form.',
        rating: 2,
        efficiency: 40,
        impact: 85,
        pros: ['High energy density', 'Easy transport', 'Versatile applications', 'Mature infrastructure'],
        cons: ['Oil spills', 'Air pollution', 'Price volatility', 'Geopolitical conflict'],
        examples: ['Diesel Generators', 'Gasoline Vehicles', 'Petrochemical Industry', 'Jet Fuel']
    },
    {
        id: 'gas',
        type: 'Non-Renewable',
        title: 'Natural Gas',
        image: gasImg,
        desc: 'Flammable gas used for heating and electricity.',
        details: 'Natural gas is a fossil energy source that formed deep beneath the earth\'s surface. Natural gas contains many different compounds. The largest component of natural gas is methane.',
        rating: 3,
        efficiency: 60,
        impact: 60,
        pros: ['Cleaner than coal', 'Efficient', 'Flexible backup power', 'Abundant'],
        cons: ['Methane leaks', 'Fracking risks', 'CO2 emissions', 'Non-renewable'],
        examples: ['Combined Cycle Plants', 'Home Heating', 'Gas Stoves', 'CNG Vehicles']
    },
    {
        id: 'nuclear',
        type: 'Non-Renewable', // Debatable, but often classified separately or non-renewable due to Uranium
        title: 'Nuclear Energy',
        image: nuclearImg,
        desc: 'Energy released from nuclear fission.',
        details: 'Nuclear energy is the energy in the nucleus, or core, of an atom. Atoms are tiny units that make up all matter in the universe, and energy is what holds the nucleus together.',
        rating: 4,
        efficiency: 92,
        impact: 40, // Low carbon, high waste risk
        pros: ['High energy output', 'Zero carbon emissions', 'Reliable baseload', 'Small land footprint'],
        cons: ['Radioactive waste', 'Accident risk', 'High capital cost', 'Proliferation risk'],
        examples: ['Fission Reactors', 'Naval Propulsion', 'Medical Isotopes', 'Research Reactors']
    },
    {
        id: 'minerals',
        type: 'Non-Renewable',
        title: 'Minerals',
        image: coalImg, // Generic
        desc: 'Raw materials for energy infrastructure.',
        details: 'Minerals like Lithium, Cobalt, and Rare Earth Elements are crucial for battery storage and renewable technologies, though extraction can be impactful.',
        rating: 3,
        efficiency: 50,
        impact: 70,
        pros: ['Essential for batteries', 'Enables renewables', 'High economic value', 'Recyclable (some)'],
        cons: ['Mining impact', 'Water pollution', 'Supply chain risks', 'Finite resources'],
        examples: ['Lithium Mines', 'Cobalt Extraction', 'Rare Earth Processing', 'Copper Mining']
    },
    {
        id: 'uranium',
        type: 'Non-Renewable',
        title: 'Uranium',
        image: nuclearImg,
        desc: 'Fuel for nuclear reactors.',
        details: 'Uranium is a heavy metal used as abundant source of concentrated energy. It occurs in most rocks in concentrations of 2 to 4 parts per million.',
        rating: 4,
        efficiency: 90,
        impact: 50,
        pros: ['Extremely energy dense', 'Low carbon profile', 'Stable supply', 'Low fuel cost'],
        cons: ['Radioactive', 'Mining tailing issues', 'Waste management', 'Public perception'],
        examples: ['Nuclear Fuel Rods', 'Yellowcake Production', 'Enrichment Facilities', 'Military Applications']
    }
];

export const ENERGY_DATA = {
    renewable: RICH_DATA.filter(d => d.type === 'Renewable'),
    nonrenewable: RICH_DATA.filter(d => d.type === 'Non-Renewable')
};

export const ALL_ENERGY_SOURCES = RICH_DATA;
