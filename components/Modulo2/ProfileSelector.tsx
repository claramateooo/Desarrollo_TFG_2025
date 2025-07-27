import { h } from "preact";
import {
  Smile,
  EyeOff,
  UserCog,
  Volume2,
} from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";

interface Props {
  selected: string;
  onChange: (value: string) => void;
}

const profileData: Record<string, { label: string; icon: h.JSX.Element }> = {
  default: {
    label: "Navegación estándar",
    icon: <Smile class="emoji" aria-hidden="true" />,
  },
  lowVision: {
    label: "Baja visión",
    icon: <EyeOff class="emoji" aria-hidden="true" />,
  },
  senior: {
    label: "Persona mayor / Movilidad reducida",
    icon: <UserCog class="emoji" aria-hidden="true" />,
  },
  screenReader: {
    label: "Lector de pantalla",
    icon: <Volume2 class="emoji" aria-hidden="true" />,
  },
};

export default function ProfileSelector({ selected, onChange }: Props) {
  return (
    <div class="selector-container">
      <label for="profile" class="selector-label">
        <span class="emoji" aria-hidden="true">
          {profileData[selected]?.icon}
        </span>
        Selecciona un perfil
      </label>

      <select
        id="profile"
        class="profile-select"
        value={selected}
        onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
        aria-label="Selector de perfil de usuario"
      >
        {Object.entries(profileData).map(([key, data]) => (
          <option key={key} value={key}>
            {data.label}
          </option>
        ))}
      </select>
    </div>
  );
}
