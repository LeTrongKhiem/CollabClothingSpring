package com.ecommerce.Application.Service;

import com.ecommerce.Application.Abstractions.IFileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Stream;

@Service
@Component
public class FileStorageService implements IFileStorageService {
    private final Path root = Paths.get("upload_images");
    private final Path categoryFile = Paths.get("upload_images/categories");
    @Override
    public void init() {
        try {
            Files.createDirectories(root);
            Files.createDirectories(categoryFile);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    @Override
    public void save(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(Objects.requireNonNull(file.getOriginalFilename())));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public String saveImage(MultipartFile file) {
        UUID uuid = UUID.randomUUID();
        String date = new SimpleDateFormat("dd-MM-yyyy").format(new Date());
        String fileName = date + "_" + uuid.toString();
        String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        try {
            Files.copy(file.getInputStream(), this.root.resolve(fileName + extension), StandardCopyOption.REPLACE_EXISTING);
            return root.toString() + "/" + fileName + extension;
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public boolean delete(String filename) {
        try {
            Path file = root.resolve(filename);
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

    @Override
    public String saveFile(MultipartFile file, Path folderName) {
        UUID uuid = UUID.randomUUID();
        String date = new SimpleDateFormat("dd-MM-yyyy").format(new Date());
        String fileName = date + "_" + uuid.toString();
        String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        try {
            Files.copy(file.getInputStream(), folderName.resolve(fileName + extension), StandardCopyOption.REPLACE_EXISTING);
            return folderName.toString().replace("\\", "/") + "/" + fileName + extension;
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void deleteFilePath(String path) {
        try {
            Path file = Paths.get(path);
            Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}
