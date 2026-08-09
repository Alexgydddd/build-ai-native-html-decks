#!/bin/sh
set -eu

if [ "$#" -ne 1 ]; then
  echo "Usage: scaffold_deck.sh <target-directory>" >&2
  exit 2
fi

target_dir=$1
script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
skill_dir=$(CDPATH= cd -- "$script_dir/.." && pwd)
starter_dir="$skill_dir/assets/starter"

if [ -d "$target_dir" ] && [ -n "$(find "$target_dir" -mindepth 1 -maxdepth 1 -print -quit 2>/dev/null)" ]; then
  echo "Refusing to scaffold into a non-empty directory: $target_dir" >&2
  exit 1
fi

mkdir -p "$target_dir" "$target_dir/tools" \
  "$target_dir/materials/00-brief" \
  "$target_dir/materials/01-source-documents" \
  "$target_dir/materials/02-brand-assets" \
  "$target_dir/materials/03-visual-references" \
  "$target_dir/materials/04-media" \
  "$target_dir/materials/05-data" \
  "$target_dir/materials/06-review-feedback"
cp -R "$starter_dir/." "$target_dir/"
cp "$skill_dir/scripts/validate_deck.mjs" "$target_dir/tools/validate-deck.mjs"

for material_dir in "$target_dir"/materials/*; do
  : > "$material_dir/.gitkeep"
done

echo "Created AI-native HTML deck project at: $target_dir"
echo "Next: read MATERIALS-GUIDE.md, complete project-brief.md, and add available source materials."
echo "Do not start full production until intake-report.md confirms that no blocking input is missing."
