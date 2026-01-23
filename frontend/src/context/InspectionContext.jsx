import React, { createContext, useContext, useState } from 'react';

const InspectionContext = createContext();

export function InspectionProvider({ children }) {
    const [results, setResults] = useState(null);
    const [formData, setFormData] = useState(null);

    const saveResults = (data) => {
        setResults(data);
    };

    const saveFormData = (data) => {
        setFormData(data);
    };

    return (
        <InspectionContext.Provider value={{ results, saveResults, formData, saveFormData }}>
            {children}
        </InspectionContext.Provider>
    );
}

export function useInspection() {
    return useContext(InspectionContext);
}
