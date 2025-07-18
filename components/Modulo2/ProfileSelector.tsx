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
    icon: <Smile class="emoji" />,
  },
  lowVision: {
    label: "Baja visión",
    icon: <EyeOff class="emoji" />,
  },
  senior: {
    label: "Persona mayor",
    icon: <UserCog class="emoji" />,
  },
  screenReader: {
    label: "Lector de pantalla",
    icon: <Volume2 class="emoji" />,
  },
};

export default function ProfileSelector({ selected, onChange }: Props) {
  return (
    <div class="selector-container">
      {/* Etiqueta con icono dinámico */}
      <label for="profile" class="selector-label">
        <span class="emoji">{profileData[selected]?.icon}</span>
        Selecciona un perfil
      </label>

      {/* Selector de perfiles */}
      <select
        id="profile"
        class="profile-select"
        value={selected}
        onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
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
