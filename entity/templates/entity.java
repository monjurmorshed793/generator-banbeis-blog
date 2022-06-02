package <%= package %>

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
<% for (const modelPackage of modelImportedPackages) { _%>
    <%= modelPackage %>
<% } _%>
@Document("<%= modelName %>")
@Data
@Builder
@Schema(name="<%= modelName %>", description="<%= modelName %>")
public class <%= modelName %>{
    @Id
<% for (const modelField of modelFields) { _%>
    <%= modelField %>

<% } _%>
}
