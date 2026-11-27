package com.workshop.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String imageUrl;
    private String type; // "prototype" or "field_notes"
    private String fieldNotesLabel;
    private String fieldNotesSubtitle;
    private String fileInfo;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private UserProfile profile;
}
