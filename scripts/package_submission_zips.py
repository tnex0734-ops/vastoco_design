import os
import zipfile
from pathlib import Path

root = Path(__file__).resolve().parent.parent
workspace = root.parent

zips = [
    workspace / "vastoco-design-hackathon-2026-submission.zip",
    workspace / "vastoco-final-handover.zip"
]

# Excluded folders / patterns
EXCLUDE_DIRS = {"node_modules", ".git", ".turbo", ".next"}
EXCLUDE_EXTS = {".log", ".tmp"}

print(f"Packaging {root.name} into submission archives...")

file_count = 0
total_uncompressed = 0

files_to_pack = []
for dirpath, dirnames, filenames in os.walk(root):
    # filter out excluded dirs
    dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
    for f in filenames:
        ext = os.path.splitext(f)[1].lower()
        if ext in EXCLUDE_EXTS:
            continue
        full_path = Path(dirpath) / f
        rel_path = full_path.relative_to(root)
        archive_name = f"vastoco-redesign/{rel_path.as_posix()}"
        size = full_path.stat().st_size
        files_to_pack.append((full_path, archive_name, size))
        file_count += 1
        total_uncompressed += size

print(f"Found {file_count} files ({total_uncompressed / (1024*1024):.2f} MB uncompressed)")

for target_zip in zips:
    print(f"Writing {target_zip.name}...")
    temp_zip = target_zip.with_suffix(".tmp.zip")
    with zipfile.ZipFile(temp_zip, "w", zipfile.ZIP_DEFLATED) as zf:
        for full_path, arcname, _ in files_to_pack:
            zf.write(full_path, arcname)
    if target_zip.exists():
        target_zip.unlink()
    temp_zip.rename(target_zip)
    print(f"Generated {target_zip.name} ({target_zip.stat().st_size / (1024*1024):.2f} MB)")

print("Packaging complete!")

