import { create } from 'zustand';

interface MemberStore{
    member : any;
    setMember: (member : any) => void;
    removeMember: () => void;
}

const useStore = create<MemberStore>((set) => ({
    member: null,
    setMember: (member: any) => {
        set((state) => ({...state, member}));
    },
    removeMember: () => {
        set((state) => ({...state, member: null}));
    },
}));

export default useStore;