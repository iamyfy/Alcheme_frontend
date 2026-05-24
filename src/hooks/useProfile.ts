import { useState, useCallback } from "react";
import type { UserProfile } from "../api/profile";

type ProfileState = {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
};

export function useProfile() {
  const [state, setState] = useState<ProfileState>({
    profile: null,
    loading: false,
    error: null,
  });

  const reload = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    // TODO (phase 2): getProfile().then(profile => setState({ profile, loading: false, error: null }))
    //                             .catch(err => setState(s => ({ ...s, loading: false, error: err.message })))
  }, []);

  const updateTimezone = useCallback((timezone: string) => {
    // TODO (phase 2): updateTimezone(timezone).then(profile => setState(s => ({ ...s, profile })))
    void timezone;
  }, []);

  const completeOnboarding = useCallback(() => {
    // TODO (phase 2): completeOnboarding().then(profile => setState(s => ({ ...s, profile })))
  }, []);

  // Reads the browser timezone and stores it — called once on first login.
  const detectAndSaveTimezone = useCallback((): string => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    updateTimezone(tz);
    return tz;
  }, [updateTimezone]);

  return { ...state, reload, updateTimezone, completeOnboarding, detectAndSaveTimezone };
}
