import React, { createContext, useContext, useState, useEffect } from 'react';
import avatarSparkyImg from '../assets/avatar_sparky.png';
import avatarLunaImg from '../assets/avatar_luna.png';
import avatarLeoImg from '../assets/avatar_leo.png';
import avatarOliverImg from '../assets/avatar_oliver.png';
import avatarMiloImg from '../assets/avatar_milo.png';

const OnboardingContext = createContext();

const initialParent = {
  id: 'p_101',
  name: 'Sarah Jenkins',
  email: 'sarah.guardian@highorbit.com',
  role: 'PARENT',
  onboardingCompleted: true,
  familyProfile: {
    familyName: 'The HighOrbit Family',
    numChildren: 1,
    communicationPreference: 'weekly_email',
  },
};

const initialChildren = [
  {
    id: 'student_1',
    parentId: 'p_101',
    name: 'Alex Parker',
    nickname: 'Alex',
    ageGroup: '15–18 years',
    dateOfBirth: '2009-04-12',
    grade: 'Grade 11',
    interests: ['Leadership & Growth', 'Mathematics & Logic', 'Creative Writing', 'Philosophy & Ethics'],
    learningGoals: ['Improve Problem Solving', 'Develop Sustained Focus', 'Build Confidence'],
    avatar: {
      id: 'student_alex',
      name: 'Alex Parker',
      title: 'HighOrbit Student',
      badge: '🎯 Mindful Scholar',
      quote: '"Clarity precedes mastery."',
      color: '#193F30',
    },
    pin: '1234',
    role: 'CHILD',
    onboardingStatus: 'completed',
  },
];

export const OnboardingProvider = ({ children: reactChildren }) => {
  // Load persisted family state from localStorage or use initial demo state
  const [parentAccount, setParentAccount] = useState(() => {
    try {
      const saved = localStorage.getItem('lifeverse_parent_account');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read parent account from localStorage', e);
    }
    return initialParent;
  });

  const [childrenList, setChildrenList] = useState(() => {
    try {
      const saved = localStorage.getItem('lifeverse_children_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clean out legacy "Sparky" / "Luna" so user sees only the unified student profile
        const hasLegacy = parsed.some(
          (c) =>
            c.name?.includes('Sparky') ||
            c.name?.includes('Luna') ||
            c.nickname === 'Sparky' ||
            c.nickname === 'Luna' ||
            c.id === 'child_1' ||
            c.id === 'child_2'
        );
        if (!hasLegacy && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read children list from localStorage', e);
    }
    return initialChildren;
  });

  const [activeChildId, setActiveChildId] = useState(() => {
    try {
      const saved = localStorage.getItem('lifeverse_active_child_id');
      if (saved && saved !== 'child_1' && saved !== 'child_2') return saved;
    } catch (e) {
      // ignore
    }
    return 'student_1';
  });

  const [currentRole, setCurrentRole] = useState(() => {
    try {
      const saved = localStorage.getItem('lifeverse_current_role');
      if (saved) return saved;
    } catch (e) {
      // ignore
    }
    return 'PARENT'; // 'PARENT' | 'CHILD'
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lifeverse_parent_account', JSON.stringify(parentAccount));
    } catch (e) {
      console.warn('Could not save parent to localStorage', e);
    }
  }, [parentAccount]);

  useEffect(() => {
    try {
      // Sanitize avatars without huge base64 strings if any
      const serializable = childrenList.map((c) => ({
        ...c,
        avatar: c.avatar ? { ...c.avatar, avatarImg: null } : null,
      }));
      localStorage.setItem('lifeverse_children_list', JSON.stringify(serializable));
    } catch (e) {
      console.warn('Could not save children to localStorage', e);
    }
  }, [childrenList]);

  useEffect(() => {
    try {
      localStorage.setItem('lifeverse_active_child_id', activeChildId);
      localStorage.setItem('lifeverse_current_role', currentRole);
    } catch (e) {
      // ignore
    }
  }, [activeChildId, currentRole]);

  // Active child helper
  const activeChild = childrenList.find((c) => c.id === activeChildId) || childrenList[0] || null;

  // 1. Parent Auth & Profile actions
  const registerParent = ({ name, email }) => {
    const newParent = {
      id: `p_${Date.now()}`,
      name: name || 'Family Guardian',
      email: email || 'parent@lifeverse.ai',
      role: 'PARENT',
      onboardingCompleted: false,
      familyProfile: {
        familyName: `${(name || 'Family').split(' ')[0]}'s Universe`,
        numChildren: 1,
        communicationPreference: 'weekly_email',
      },
    };
    setParentAccount(newParent);
    setIsAuthenticated(true);
    setCurrentRole('PARENT');

    // Create a fresh draft child profile for onboarding
    const firstChild = {
      id: `child_${Date.now()}`,
      parentId: newParent.id,
      name: 'Little Explorer',
      nickname: 'Explorer',
      ageGroup: '6–9 years',
      dateOfBirth: '',
      grade: 'Grade 1',
      interests: ['Space & Science'],
      learningGoals: ['Improve Problem Solving'],
      avatar: {
        id: 'sparky',
        name: 'Sparky McWonder',
        title: 'The Inquisitive Adventurer',
        avatarImg: avatarSparkyImg,
        badge: '🚀 Cosmic Explorer',
        color: '#F45124',
      },
      pin: '1234',
      role: 'CHILD',
      onboardingStatus: 'in_progress',
    };
    setChildrenList([firstChild]);
    setActiveChildId(firstChild.id);
  };

  const loginParent = (email) => {
    setIsAuthenticated(true);
    setCurrentRole('PARENT');
    if (email) {
      setParentAccount((prev) => ({ ...prev, email }));
    }
  };

  const loginChild = (childId, _pin) => {
    const found = childrenList.find((c) => c.id === childId);
    if (found) {
      setActiveChildId(childId);
      setCurrentRole('CHILD');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentRole('PARENT');
  };

  const switchRole = (newRole, childId = null) => {
    setCurrentRole(newRole);
    if (childId) {
      setActiveChildId(childId);
    }
  };

  const updateFamilyProfile = (updates) => {
    setParentAccount((prev) => ({
      ...prev,
      familyProfile: {
        ...prev.familyProfile,
        ...updates,
      },
    }));
  };

  // 2. Multi-child Profile Actions
  const addChild = (customData = {}) => {
    const newId = `child_${Date.now()}`;
    const newChild = {
      id: newId,
      parentId: parentAccount.id,
      name: customData.name || `Explorer ${childrenList.length + 1}`,
      nickname: customData.nickname || `Explorer ${childrenList.length + 1}`,
      ageGroup: customData.ageGroup || '6–9 years',
      dateOfBirth: customData.dateOfBirth || '',
      grade: customData.grade || 'Grade 1',
      interests: customData.interests || ['Space & Science'],
      learningGoals: customData.learningGoals || ['Improve Problem Solving'],
      avatar: customData.avatar || {
        id: 'sparky',
        name: 'Sparky McWonder',
        avatarImg: avatarSparkyImg,
        badge: '🚀 Cosmic Explorer',
        color: '#F45124',
      },
      pin: '1234',
      role: 'CHILD',
      onboardingStatus: 'in_progress',
      ...customData,
    };
    setChildrenList((prev) => [...prev, newChild]);
    setActiveChildId(newId);
    return newId;
  };

  const updateChild = (childId, updates) => {
    setChildrenList((prev) =>
      prev.map((c) => (c.id === childId ? { ...c, ...updates } : c))
    );
  };

  const removeChild = (childId) => {
    if (childrenList.length <= 1) {
      // Don't delete last child, just reset it
      return false;
    }
    setChildrenList((prev) => {
      const remaining = prev.filter((c) => c.id !== childId);
      if (activeChildId === childId && remaining.length > 0) {
        setActiveChildId(remaining[0].id);
      }
      return remaining;
    });
    return true;
  };

  const updateChildProfile = ({ childName, childNickname, dateOfBirth, grade }) => {
    if (!activeChildId) return;
    updateChild(activeChildId, {
      name: childName,
      nickname: childNickname || (childName ? childName.split(' ')[0] : 'Explorer'),
      ...(dateOfBirth !== undefined && { dateOfBirth }),
      ...(grade !== undefined && { grade }),
    });
  };

  const updateAge = (ageGroup) => {
    if (!activeChildId) return;
    updateChild(activeChildId, { ageGroup });
  };

  const toggleInterest = (interest) => {
    if (!activeChild) return;
    const current = activeChild.interests || [];
    const exists = current.includes(interest);
    const updated = exists ? current.filter((i) => i !== interest) : [...current, interest];
    updateChild(activeChild.id, { interests: updated });
  };

  const toggleGoal = (goal) => {
    if (!activeChild) return;
    const current = activeChild.learningGoals || [];
    const exists = current.includes(goal);
    const updated = exists ? current.filter((g) => g !== goal) : [...current, goal];
    updateChild(activeChild.id, { learningGoals: updated });
  };

  const selectAvatar = (avatar) => {
    if (!activeChildId) return;
    updateChild(activeChildId, { avatar });
  };

  const updateLinking = ({ parentEmail, relationship }) => {
    setParentAccount((prev) => ({
      ...prev,
      email: parentEmail || prev.email,
      relationship: relationship || 'Parent',
    }));
  };

  const completeOnboarding = () => {
    setParentAccount((prev) => ({ ...prev, onboardingCompleted: true }));
    setChildrenList((prev) =>
      prev.map((c) => ({ ...c, onboardingStatus: 'completed' }))
    );
  };

  const resetOnboarding = () => {
    setParentAccount(initialParent);
    setChildrenList(initialChildren);
    setActiveChildId('child_1');
    setCurrentRole('PARENT');
    setIsAuthenticated(true);
    localStorage.removeItem('lifeverse_parent_account');
    localStorage.removeItem('lifeverse_children_list');
    localStorage.removeItem('lifeverse_active_child_id');
  };

  // Backwards-compatible "data" snapshot for existing components
  const data = {
    // Parent info
    parentName: parentAccount.name,
    parentEmail: parentAccount.email,
    isLoggedIn: isAuthenticated,
    relationship: parentAccount.relationship || 'Parent',
    familyProfile: parentAccount.familyProfile,
    onboardingCompleted: parentAccount.onboardingCompleted,

    // Multi-child
    children: childrenList,
    activeChildId,
    activeChild,

    // Active Child snapshot for legacy components
    childName: activeChild?.name || 'Alex Parker',
    childNickname: activeChild?.nickname || 'Alex',
    dateOfBirth: activeChild?.dateOfBirth || '',
    grade: activeChild?.grade || 'Grade 11',
    ageGroup: activeChild?.ageGroup || '15–18 years',
    interests: activeChild?.interests || ['Leadership & Growth', 'Mathematics & Logic'],
    learningGoals: activeChild?.learningGoals || ['Improve Problem Solving'],
    avatar: activeChild?.avatar || {
      id: 'student_alex',
      name: 'Alex Parker',
      title: 'HighOrbit Student',
      badge: '🎯 Mindful Scholar',
      color: '#193F30',
    },
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        parentAccount,
        childrenList,
        activeChild,
        activeChildId,
        currentRole,
        isAuthenticated,
        registerParent,
        loginParent,
        loginChild,
        logout,
        switchRole,
        updateFamilyProfile,
        addChild,
        updateChild,
        removeChild,
        setActiveChild: setActiveChildId,
        updateChildProfile,
        updateAge,
        toggleInterest,
        toggleGoal,
        selectAvatar,
        updateLinking,
        completeOnboarding,
        resetOnboarding,
        setParentEmail: (email) => setParentAccount((prev) => ({ ...prev, email })),
      }}
    >
      {reactChildren}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export default OnboardingContext;
