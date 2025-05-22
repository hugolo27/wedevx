import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  country: string;
  selectedVisas: string[];
  resume: File | null;
  additionalInfo: string;
  status: 'PENDING' | 'REACHED_OUT';
  createdAt: string;
}

interface LeadsState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
}

// Load initial state from localStorage if available
const loadState = (): LeadsState => {
  if (typeof window === 'undefined') return initialState;
  try {
    const serializedState = localStorage.getItem('leadsState');
    if (serializedState === null) return initialState;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return initialState;
  }
};

const initialState: LeadsState = {
  leads: [],
  loading: false,
  error: null,
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState: loadState(),
  reducers: {
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('leadsState', JSON.stringify(state));
      }
    },
    updateLeadStatus: (state, action: PayloadAction<{ id: string; status: 'PENDING' | 'REACHED_OUT' }>) => {
      const lead = state.leads.find(l => l.id === action.payload.id);
      if (lead) {
        lead.status = action.payload.status;
        if (typeof window !== 'undefined') {
          localStorage.setItem('leadsState', JSON.stringify(state));
        }
      }
    },
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('leadsState', JSON.stringify(state));
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addLead, updateLeadStatus, setLeads, setLoading, setError } = leadsSlice.actions;
export default leadsSlice.reducer; 