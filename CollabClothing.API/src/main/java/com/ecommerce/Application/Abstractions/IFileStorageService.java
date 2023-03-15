package com.ecommerce.Application.Abstractions;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface IFileStorageService {
    void init();
    void save(MultipartFile file);
    String saveImage(MultipartFile file);
    Resource load(String filename);
    boolean delete(String filename);
    void deleteAll();
    Stream<Path> loadAll();
    String saveFile (MultipartFile file, Path folderName);
    void deleteFilePath(String path);
}
