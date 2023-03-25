package com.ecommerce.Application.Extensions;

import com.ecommerce.Model.Products.PartFileModel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class FileUploadModelConverter {
    public static List<PartFileModel> convert(MultipartHttpServletRequest request) {
        List<PartFileModel> model = new ArrayList<>();
        Map<String, List<MultipartFile>> files = request.getMultiFileMap();
        Map<String, String[]> params = request.getParameterMap();

        // Lặp qua từng trường trong danh sách
        for (Map.Entry<String, List<MultipartFile>> entry : files.entrySet()) {
            String fieldName = entry.getKey();
            List<MultipartFile> fileList = entry.getValue();
            String[] fieldValues = params.get(fieldName + "thumbnail");
            if (fieldValues == null)
                continue;
            // Tạo đối tượng PartFileModel từ các giá trị trong trường
            for (int i = 0; i < fileList.size(); i++) {
                MultipartFile file = fileList.get(i);
                boolean thumbnail = Boolean.parseBoolean(fieldValues[i]);

                PartFileModel partFileModel = new PartFileModel(file, thumbnail);
                model.add(partFileModel);
            }
        }
        return model;
    }
}
